import { sendEmail } from "../config/email.js";

export async function sendEmailController(req, res) {
  const { to, subject, text, html } = req.body ?? {};

  if (!to) {
    return res.status(400).json({ error: "Field 'to' is required." });
  }

  const finalSubject = subject || "Untitled email";
  const finalText = text || "Email enviado pelo backend.";

  try {
    const info = await sendEmail({
      to,
      subject: finalSubject,
      text: finalText,
      html,
    });

    return res.json({ ok: true, messageId: info?.messageId ?? null });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

