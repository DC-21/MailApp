import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import imaps, { ImapSimpleOptions } from 'imap-simple';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors'
import morgan from 'morgan';
import { simpleParser } from 'mailparser';

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan("dev"))
app.use(cors())
app.use(compression())
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `codedr21@gmail.com`,
        pass: `iptd osna ynpl yjdo`,
    }
});

const imapConfig: ImapSimpleOptions = {
    imap: {
        user: `codedr21@gmail.com`,
        password: `iptd osna ynpl yjdo`,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000,
        tlsOptions: { rejectUnauthorized: false }
    }
};

app.post('/send-email', (req: Request, res: Response) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.get('/fetch-emails', async (req: Request, res: Response) => {
    try {
        const connection = await imaps.connect(imapConfig);
        await connection.openBox('INBOX');

        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const emails = await Promise.all(messages.map(async message => {
            const headerPart = message.parts.find(part => part.which === 'HEADER');
            const bodyPart = message.parts.find(part => part.which === 'TEXT');
            if (headerPart && headerPart.body && bodyPart) {
                const header = headerPart.body;
                const parsed = await simpleParser(bodyPart.body);
                const subject = header.subject[0];
                const from = header.from[0];
                const text = parsed.text;
                return { subject, from, text };
            }
            return null;
        }));

        const filteredEmails = emails.filter((email): email is { subject: string; from: string; text: string | undefined } => email !== null);

        await connection.end();
        res.json(filteredEmails);
    } catch (error: any) {
        res.status(500).send('Error fetching emails: ' + error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
