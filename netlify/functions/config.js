exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get the referer
  const referer = event.headers.referer || '';
  
  // Check if the request is coming from your allowed domains
  const allowedDomains = [
    'https://vapi-widget.netlify.app',
    'https://elev8tion.github.io'
    // Add other allowed domains here
  ];
  
  if (!allowedDomains.some(domain => referer.startsWith(domain))) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Unauthorized domain' })
    };
  }

  // Return only the necessary environment variables
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    body: `window.ENV = {
      VAPI_PUBLIC_KEY: "${process.env.VAPI_PUBLIC_KEY || ''}",
      VAPI_ASSISTANT_ID: "${process.env.VAPI_ASSISTANT_ID || ''}"
    };`
  };
}; 
