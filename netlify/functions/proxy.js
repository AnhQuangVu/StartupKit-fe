// Netlify Function to proxy requests
const https = require('https');
const http = require('http');

exports.handler = async function(event, context) {
  const API_TARGET = process.env.PROXY_TARGET || 'http://160.191.243.253:8003';

  // Get the path from event.path (remove /.netlify/functions/proxy prefix)
  const incomingPath = event.path.replace('/.netlify/functions/proxy', '');
  const targetURL = `${API_TARGET}${incomingPath}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''}`;

  // Forward headers but remove host
  const headers = { ...event.headers };
  delete headers.host;
  delete headers['x-forwarded-host'];
  
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

    // Make request to target
    const response = await new Promise((resolve, reject) => {
      const client = options.protocol === 'https:' ? https : http;
      const req = client.request(requestOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        });
      });

      // Handle request errors
      req.on('error', (error) => {
        console.error('Proxy request failed:', error);
        reject(error);
      });

      // Send body if present
      if (event.body) {
        req.write(event.body);
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