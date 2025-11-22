const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Name, email, and message are required' 
        })
      };
    }

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || smtpUser;

    // Check if email configuration is set
    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('Email configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Email service is not configured. Please contact the site administrator.' 
        })
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort == 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword
      }
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: subject || `Contact Form: Message from ${name}`,
      text: `You received a new message from your contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject || 'No subject'}\n\n` +
            `Message:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('Contact form submission sent:', { name, email, subject });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to send your message. Please try again later or contact me directly.' 
      })
    };
  }
};
