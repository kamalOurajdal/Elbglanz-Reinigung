// Use CommonJS syntax as it's standard for Vercel Node.js functions
const nodemailer = require("nodemailer");

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
  if (
    !process.env.GMAIL_USER ||
    !process.env.GMAIL_APP_PASSWORD ||
    !process.env.RECIPIENT_EMAIL
  ) {
    console.error("Missing required environment variables for Nodemailer.");
    // Do not expose specific configuration details to the client.
    return response.status(500).json({ error: "Server configuration error." });
  }

  // 2. Only allow POST requests for this endpoint.
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  // 3. Extract and sanitize data from the request body based on the specified payload.
  const {
    firstName,
    lastName,
    phone,
    email,
    service,
    message,
    source = "website", // Default source to 'website' if not provided
  } = request.body;

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  // 4. Perform robust validation.
  if (!firstName || !lastName || !service) {
    return response
      .status(400)
      .json({ error: "First name, last name, and service are required." });
  }

  // Require at least an email or a phone number for contact.
  if (!email && !phone) {
    return response
      .status(400)
      .json({ error: "Please provide either an email or a phone number." });
  }

  // Validate email format if it exists.
  if (email && !validateEmail(email)) {
    return response
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  // 5. Create a well-designed HTML email body.
  const htmlBody = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Service Inquiry</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background-color: #2563eb;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #2563eb;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 15px 0;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
        }
        
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .label {
            font-weight: 600;
            color: #6b7280;
            width: 100px;
            flex-shrink: 0;
        }
        
        .value {
            color: #111827;
            flex: 1;
        }
        
        .value a {
            color: #2563eb;
            text-decoration: none;
        }
        
        .value a:hover {
            text-decoration: underline;
        }
        
        .service-tag {
            background-color: #2563eb;
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .message-box {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            margin-top: 10px;
        }
        
        .message-text {
            margin: 0;
            color: #374151;
            white-space: pre-wrap;
        }
        
        .no-message {
            color: #9ca3af;
            font-style: italic;
            text-align: center;
        }
        
        .footer {
            background-color: #f9fafb;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .container {
                margin: 0;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .info-row {
                flex-direction: column;
                gap: 4px;
            }
            
            .label {
                width: auto;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Service Inquiry</h1>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Client Details</h2>
                <div class="info-row">
                    <div class="label">Name:</div>
                    <div class="value">${fullName}</div>
                </div>
                <div class="info-row">
                    <div class="label">Email:</div>
                    <div class="value">
                        ${
                          email
                            ? `<a href="mailto:${email}">${email}</a>`
                            : "Not provided"
                        }
                    </div>
                </div>
                <div class="info-row">
                    <div class="label">Phone:</div>
                    <div class="value">
                        ${
                          phone
                            ? `<a href="tel:${phone}">${phone}</a>`
                            : "Not provided"
                        }
                    </div>
                </div>
                <div class="info-row">
                    <div class="label">Service:</div>
                    <div class="value">
                        <span class="service-tag">${service}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="label">Source:</div>
                    <div class="value">${source}</div>
                </div>
            </div>
            
            <div class="section">
                <h2>Message</h2>
                <div class="message-box">
                    ${
                      message
                        ? `<p class="message-text">${message}</p>`
                        : `<p class="no-message">No message provided</p>`
                    }
                </div>
            </div>
        </div>
        
        <div class="footer">
            Received from your website contact form<br>
            ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
        </div>
    </div>
</body>
</html>
    `;

  // 6. Configure the Nodemailer transporter using environment variables.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
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
    return response
      .status(200)
      .json({
        success: true,
        message: "Your message has been sent successfully!",
      });
  } catch (error) {
    console.error("Failed to send email:", error);
    return response
      .status(500)
      .json({
        error:
          "There was an issue sending your message. Please try again later.",
      });
  }
};
