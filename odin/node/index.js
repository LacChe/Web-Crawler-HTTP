const http = require('http');
const fs = require('fs');

async function handleRequest() {
  
  const hostname = '127.0.0.1';
  const port = 3000;
  
  const server = http.createServer((req, res) => {
    let fileName = `.${req.url}.html`;
    if(fileName === './.html') fileName = './index.html';
    let pageToServe = fs.readFileSync('./404.html', 'utf8');
    try {
      pageToServe = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
      console.log('err:', err)
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(pageToServe);
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

handleRequest();