const https = require('https');
const http = require('http');

exports.handler = async function(event, context) {
  // Use PROXY_TARGET from env or fallback to default
  const API_TARGET = process.env.PROXY_TARGET || 'http://160.191.243.253:8003';
  console.log('Using API_TARGET:', API_TARGET);

  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '86400'
      }
    };
  }

  // Get the path from event.path (remove /.netlify/functions/proxy prefix)
  const incomingPath = event.path.replace('/.netlify/functions/proxy', '');
  const targetURL = `${API_TARGET}${incomingPath}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''}`;

  console.log(`Proxying ${event.httpMethod} request to: ${targetURL}`);

  try {
    // Create request options
    const options = new URL(targetURL);
    const requestOptions = {
      method: event.httpMethod,
      protocol: options.protocol,
      hostname: options.hostname,
      port: options.port,
      path: options.pathname + options.search,
      headers: {
        ...event.headers,
        host: options.host,
      }
    };

    // Remove Netlify-specific headers
    delete requestOptions.headers.host;
    delete requestOptions.headers['x-forwarded-host'];
    delete requestOptions.headers['x-forwarded-proto'];
    delete requestOptions.headers['x-forwarded-for'];
    delete requestOptions.headers['x-country'];
    delete requestOptions.headers['client-ip'];
    delete requestOptions.headers.connection;

    console.log('Request headers:', requestOptions.headers);

    // Make request to target
    const response = await new Promise((resolve, reject) => {
      const req = (options.protocol === 'https:' ? https : http).request(requestOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          console.log(`Backend responded with status: ${res.statusCode}`);
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
        reject(new Error('Request timed out'));
      });

      req.on('error', (error) => {
        console.error('Proxy request failed:', error);
        reject(error);
      });

      // Send body if present
      if (event.body) {
        let bodyToSend = event.body;
        const contentType = (event.headers['content-type'] || '').toLowerCase();
        
        if (contentType === 'application/json') {
          try {
            const bodyData = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
            bodyToSend = JSON.stringify(bodyData);
          } catch (e) {
            console.error('Failed to parse JSON body:', e);
          }
        }
        
        console.log('Request body:', bodyToSend);
        req.write(bodyToSend);
      }

      req.end();
    });

    // Return response
    return {
      statusCode: response.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
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