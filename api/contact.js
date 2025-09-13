// Use CommonJS syntax as it's standard for Vercel Node.js functions
const nodemailer = require('nodemailer');

/**
 * A simple email validation utility.
 * @param {string} email The email to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Main handler for the Vercel serverless function.
 * This function processes a contact form submission for a cleaning service website.
 * @param {import('@vercel/node').VercelRequest} request The incoming request object.
 * @param {import('@vercel/node').VercelResponse} response The outgoing response object.
 */
module.exports = async (request, response) => {
  // 1. Check for required environment variables on the server.
  // This prevents the function from running into errors if configuration is missing.
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.RECIPIENT_EMAIL) {
    console.error('Missing required environment variables for Nodemailer.');
    // Do not expose specific configuration details to the client.
    return response.status(500).json({ error: 'Server configuration error.' });
  }

  // 2. Only allow POST requests for this endpoint.
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // 3. Extract and sanitize data from the request body based on the specified payload.
  const {
    firstName,
    lastName,
    phone,
    email,
    service,
    message,
    source = 'website', // Default source to 'website' if not provided
  } = request.body;

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();

  // 4. Perform robust validation.
  if (!firstName || !lastName || !service) {
    return response.status(400).json({ error: 'First name, last name, and service are required.' });
  }

  // Require at least an email or a phone number for contact.
  if (!email && !phone) {
    return response.status(400).json({ error: 'Please provide either an email or a phone number.' });
  }

  // Validate email format if it exists.
  if (email && !validateEmail(email)) {
    return response.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // 5. Create a well-designed HTML email body.
  const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f7f6;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            }
            .header {
                background-color: #007bff; /* A clean, professional blue */
                color: #ffffff;
                padding: 24px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                color: #333333;
            }
            .content h2 {
                color: #007bff;
                font-size: 20px;
                margin-top: 0;
            }
            .info-table {
                width: 100%;
                border-collapse: collapse;
            }
            .info-table td {
                padding: 12px 0;
                border-bottom: 1px solid #eeeeee;
                font-size: 16px;
            }
            .info-table td.label {
                font-weight: 600;
                color: #555555;
                width: 150px;
            }
            .message-box {
                background-color: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin-top: 20px;
                white-space: pre-wrap; /* Preserves line breaks from the original message */
                font-size: 16px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999999;
                background-color: #f4f7f6;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Cleaning Service Inquiry</h1>
            </div>
            <div class="content">
                <h2>Client Details</h2>
                <table class="info-table">
                    <tr>
                        <td class="label">Full Name:</td>
                        <td>${fullName}</td>
                    </tr>
                    <tr>
                        <td class="label">Email:</td>
                        <td>${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td class="label">Phone:</td>
                        <td>${phone || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td class="label">Service:</td>
                        <td><strong>${service}</strong></td>
                    </tr>
                    <tr>
                        <td class="label">Source:</td>
                        <td>${source}</td>
                    </tr>
                </table>

                <h2>Message</h2>
                <div class="message-box">
                    ${message || 'No message provided.'}
                </div>
            </div>
            <div class="footer">
                This email was sent from your website's contact form.
            </div>
        </div>
    </body>
    </html>
  `;


  // 6. Configure the Nodemailer transporter using environment variables.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // 7. Define the email options.
  const mailOptions = {
    from: `"Website Inquiry" <${process.env.GMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email, // Set the "Reply-To" to the client's email for convenience.
    subject: `New Inquiry for ${service} from ${fullName}`,
    html: htmlBody,
  };

  // 8. Send the email and provide a response to the client.
  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return response.status(500).json({ error: 'There was an issue sending your message. Please try again later.' });
  }
};
