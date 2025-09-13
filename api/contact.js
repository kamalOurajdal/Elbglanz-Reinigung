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
  } = request.body;

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  // 4. Perform robust validation.
  if (!firstName || !lastName || !service) {
    return response
      .status(400)
      .json({ error: "Vorname, Nachname und Dienstleistung sind erforderlich." });
  }

  // Require at least an email or a phone number for contact.
  if (!email && !phone) {
    return response
      .status(400)
      .json({ error: "Bitte geben Sie entweder eine E-Mail oder eine Telefonnummer an." });
  }

  // Validate email format if it exists.
  if (email && !validateEmail(email)) {
    return response
      .status(400)
      .json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an." });
  }

  // 5. Create a well-designed HTML email body.
  const htmlBody = `
    <!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neue Service-Anfrage</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px 0;
        }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .header { background-color: #2563eb; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #2563eb; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        .info-row:last-child { border-bottom: none; }
        .label { font-weight: 600; color: #6b7280; width: 100px; flex-shrink: 0; }
        .value { color: #111827; flex: 1; }
        .value a { color: #2563eb; text-decoration: none; }
        .value a:hover { text-decoration: underline; }
        .message-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-top: 10px; }
        .message-text { margin: 0; color: #374151; white-space: pre-wrap; }
        .no-message { color: #9ca3af; font-style: italic; text-align: center; }
        .footer { background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Neue Service-Anfrage</h1>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Kundendetails</h2>
                <div class="info-row"><div class="label">Name: </div><div class="value">${fullName}</div></div>
                <div class="info-row"><div class="label">E-Mail: </div><div class="value">${ email ? `<a href="mailto:${email}">${email}</a>` : "<i style='color: #9ca3af;'>Nicht angegeben</i>" }</div></div>
                <div class="info-row"><div class="label">Telefon: </div><div class="value">${ phone ? `<a href="tel:${phone}">${phone}</a>` : "<i style='color: #9ca3af;'>Nicht angegeben</i>" }</div></div>
                <div class="info-row"><div class="label">Dienstleistung: </div><div class="value"><span class="service-tag">${service}</span></div></div>
            </div>
            
            <div class="section">
                <h2>Nachricht</h2>
                <div class="message-box">
                    ${ message ? `<p class="message-text">${message}</p>` : `<p class="no-message">Keine Nachricht angegeben</p>` }
                </div>
            </div>
        </div>
        
        <div class="footer">
            Erhalten über das Kontaktformular Ihrer Website<br>
            ${new Date().toLocaleDateString("de-DE")} um ${new Date().toLocaleTimeString("de-DE")}
        </div>
    </div>
</body>
</html>
  `;

  // 6. Configure the Nodemailer transporter using environment variables.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // 7. Define the email options.
  const mailOptions = {
    from: `"Website-Anfrage" <${process.env.GMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email,
    subject: `Neue Anfrage für ${service} von ${fullName}`,
    html: htmlBody,
  };

  // 8. E-Mail senden und Antwort zurückgeben.
  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({
      success: true,
      message: "Ihre Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei Ihnen.",
    });
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    return response.status(500).json({
      error: "Beim Senden Ihrer Nachricht ist ein Problem aufgetreten. Bitte versuchen Sie es später erneut.",
    });
  }
};
