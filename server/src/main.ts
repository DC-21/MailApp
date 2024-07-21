import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import imaps, { ImapSimpleOptions } from "imap-simple";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { simpleParser } from "mailparser";
import authRouter from "./auth/router";

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use("/auth", authRouter);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ``,
    pass: ``,
  },
});

const imapConfig: ImapSimpleOptions = {
  imap: {
    user: ``,
    password: ``,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false },
  },
};

app.post("/send-email", (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  console.log(req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send("Email sent: " + info.response);
  });
});

app.get("/fetch-emails", async (_req: Request, res: Response) => {
  try {
    console.log("Connecting to IMAP server...");
    const connection = await imaps.connect(imapConfig);
    console.log("Connected to IMAP server.");

    console.log("Opening INBOX...");
    await connection.openBox("INBOX");
    console.log("INBOX opened.");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = {
      bodies: ["HEADER", "TEXT"],
      markSeen: false,
      struct: true,
    };

    console.log("Searching for unseen emails...");
    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`Found ${messages.length} unseen emails.`);

    const limit = 50; // Limit to the first 50 emails
    const limitedMessages = messages.slice(0, limit);
    console.log(`Processing the first ${limit} emails.`);

    const emails = await Promise.all(
      limitedMessages.map(async (message) => {
        const headerPart = message.parts.find(
          (part) => part.which === "HEADER"
        );
        const bodyPart = message.parts.find((part) => part.which === "TEXT");
        if (headerPart && headerPart.body && bodyPart) {
          const header = headerPart.body;
          const parsed = await simpleParser(bodyPart.body);
          const subject = header.subject[0];
          const from = header.from[0].replace(/<.*?>/g, ""); // Extract sender without email address
          const text = parsed.text || ""; // Use empty string if parsed.text is undefined
          const date = new Date(header.date[0]).toLocaleString(); // Format date
          return { from, subject, date, text };
        }
        return null;
      })
    );

    const filteredEmails = emails.filter(
      (
        email
      ): email is {
        subject: string;
        from: string;
        date: string;
        text: string;
      } => email !== null
    );

    await connection.end();
    console.log("IMAP connection closed.");
    res.json(filteredEmails);
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails: " + error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
