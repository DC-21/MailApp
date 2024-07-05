import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cholahkuboko@gmail.com',
        pass: 'nkji fnsc tdeu rsak'
    }
});

app.post('/send-email', (req: Request, res: Response) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'cholahkuboko@gmail.com',
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
