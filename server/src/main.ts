import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import imaps, { ImapSimpleOptions } from 'imap-simple';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`,
    }
});

const imapConfig: ImapSimpleOptions = {
    imap: {
        user: `${process.env.EMAIL_USER}`,
        password: `${process.env.EMAIL_PASS}`,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
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
        const emails = messages.map(message => {
            const headerPart = message.parts.find(part => part.which === 'HEADER');
            if (headerPart && headerPart.body) {
                const header = headerPart.body;
                const subject = header.subject[0];
                const from = header.from[0];
                return { subject, from };
            }
            return null;
        }).filter(email => email !== null);

        await connection.end();
        res.json(emails);
    } catch (error:any) {
        res.status(500).send('Error fetching emails: ' + error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
