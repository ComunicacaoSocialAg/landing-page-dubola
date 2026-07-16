import https from 'https';

const siteUrl = 'https://site-five-chi-79.vercel.app/';
const key = 'a123e456c789b012d345f67890abcdef';

const data = JSON.stringify({
  host: 'site-five-chi-79.vercel.app',
  key: key,
  keyLocation: `${siteUrl}${key}.txt`,
  urlList: [
    siteUrl,
    `${siteUrl}claro`
  ]
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('Sending post-build URL notification to IndexNow API...');

const req = https.request(options, (res) => {
  console.log(`IndexNow Server Response Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Failed to notify IndexNow:', error);
});

req.write(data);
req.end();
