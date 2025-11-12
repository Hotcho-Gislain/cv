exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;

    // Here you can add:
    // - Email sending (using SendGrid, etc.)
    // - Database storage
    // - Notification systems
    
    console.log('Contact form submission:', { name, email, subject, message });

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
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process your message' 
      })
    };
  }
};
