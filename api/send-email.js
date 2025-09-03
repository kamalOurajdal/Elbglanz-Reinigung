// Use CommonJS syntax to avoid ES Module errors in some environments
const nodemailer = require('nodemailer');

/**
 * Main function handler
 * @param {import('@vercel/node').VercelRequest} request
 * @param {import('@vercel/node').VercelResponse} response
 */
module.exports = async (request, response) => {
  // 1. Only allow POST requests
  // return response.status(200).json({ success: true, message: 'Email sent successfully!' });

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).end('Method Not Allowed');
  }

  // 2. Extract data from the request body
  const { name, email, message } = request.body;

  // 3. Basic validation
  if (!name || !email || !message) {
    return response.status(400).json({ error: 'Missing required fields.' });
  }

  // 4. Set up the Nodemailer transporter
  // We use environment variables for security.
  // These must be configured in your Vercel project settings.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env["GMAIL_USER"], // Your Gmail address
      pass: process.env["GMAIL_APP_PASSWORD"], // Your Gmail App Password
    },
  });

  // 5. Define the email options
  const mailOptions = {
    from: `"Contact Form" <${process.env["GMAIL_USER"]}>`, // Sender address (your app)
    to: process.env["RECIPIENT_EMAIL"], // The email address you want to receive the messages on
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Message from your Website Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  // 6. Send the email and handle the response
  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    // It's good practice to not expose detailed error messages to the client
    return response.status(500).json({ error: 'Failed to send email.' });
  }
};

