import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, phone, message, service } = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"]!,
    port: Number(process.env["SMTP_PORT"] || 587),
    secure: false,
    auth: {
      user: process.env["SMTP_USER"]!,
      pass: process.env["SMTP_PASS"]!,
    },
  });

  await transporter.sendMail({
    from: process.env["MAIL_FROM"] || `"Contact Form" <${process.env["SMTP_USER"]}>`,
    to: process.env["MAIL_TO"]!,
    subject: `New message from ${name}`,
    replyTo: email,
    text: `From: ${name} <${email}>\nPhone: ${phone ?? ""}\n\n${message}`,
  });

  return Response.json({ ok: true });
}