const https = require('https');

exports.handler = async function(event, context) {
  try {
    const response = await new Promise((resolve, reject) => {
      https.get(
        'https://ai.asu.edu/taxonomy/term/1/feed',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/rss+xml, application/xml, text/xml'
          }
        },
        (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            resolve({
              statusCode: 200,
              body: data,
              headers: {
                'Content-Type': 'application/xml',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
              }
            });
          });
        }
      ).on('error', (e) => {
        reject({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
      });
    });
    
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
