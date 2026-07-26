import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export function generateVerificationCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendVerificationEmail(to, code) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Confirma o teu email - Untitled",
        text: `O teu código de confirmação é ${code}. Expira em 15 minutos.`,
        html: `<p>O teu código de confirmação é <b>${code}</b>.</p><p>Expira em 15 minutos.</p>`,
    });
}

export async function sendPasswordResetEmail(to, code) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Recuperação de password - Untitled",
        text: `O teu código de recuperação de password é ${code}. Expira em 15 minutos. Se não pediste isto, ignora este email.`,
        html: `<p>O teu código de recuperação de password é <b>${code}</b>.</p><p>Expira em 15 minutos. Se não pediste isto, ignora este email.</p>`,
    });
}
