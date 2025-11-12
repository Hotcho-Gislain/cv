exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Here you can:
    // - Send an email
    // - Save to a database
    // - Integrate with other services
    console.log('Contact form submission:', { name, email, message });

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process your message. Please try again.' 
      })
    };
  }
};
