// Netlify Function to proxy requests
const https = require('https');
const http = require('http');

exports.handler = async function(event, context) {
  // Validate PROXY_TARGET
  const API_TARGET = process.env.PROXY_TARGET;
  if (!API_TARGET) {
    console.error('PROXY_TARGET environment variable is not set');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'configuration_error',
        message: 'PROXY_TARGET environment variable is not set'
      })
    };
  }

  // Log incoming request
  console.log('Incoming request:', {
    method: event.httpMethod,
    path: event.path,
    headers: event.headers
  });

  // Handle OPTIONS requests for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    };
  }

  // Get the path and build target URL
  const incomingPath = event.path.replace('/.netlify/functions/proxy', '');
  const targetURL = `${API_TARGET}${incomingPath}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''}`;

  console.log('Proxying to:', targetURL);

  // Forward headers but remove Netlify-specific ones
  const headers = { ...event.headers };
  delete headers.host;
  delete headers['x-forwarded-host'];
  delete headers['x-forwarded-proto'];
  delete headers['x-forwarded-for'];
  delete headers['x-country'];
  delete headers['x-datadog-trace-id'];
  delete headers['x-datadog-parent-id'];
  delete headers['x-datadog-sampling-priority'];
  
  try {
    // Create request options
    const options = new URL(targetURL);
    const requestOptions = {
      method: event.httpMethod,
      headers: headers,
      protocol: options.protocol,
      hostname: options.hostname,
      port: options.port,
      path: options.pathname + options.search,
    };

    // Make request to target with timeout
    const response = await new Promise((resolve, reject) => {
      const client = options.protocol === 'https:' ? https : http;
      const req = client.request(requestOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          // Log response status and headers for debugging
          console.log('Backend response:', {
            status: res.statusCode,
            headers: res.headers
          });
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      });

      // Set timeout
      req.setTimeout(15000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      // Handle request errors
      req.on('error', (error) => {
        console.error('Proxy request failed:', error);
        reject(error);
      });

      // Send body if present
      if (event.body) {
        // Parse body if it's a string (it usually is from Netlify)
        const bodyData = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const bodyString = JSON.stringify(bodyData);
        console.log('Sending request body:', bodyString);
        req.write(bodyString);
      }

      req.end();
    });

    // Return response to client
    return {
      statusCode: response.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        ...response.headers
      },
      body: response.body
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'proxy_error',
        message: error.message,
        target: targetURL
      })
    };
  }
};