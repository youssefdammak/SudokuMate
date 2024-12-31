var http = require('http');
var fs = require('fs');

// Create the HTTP server
var server = http.createServer(function (req, res) {
if (req.url === '/' || req.url === '/index.html') {

    fs.readFile('index.html', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
} 
else if (req.url === '/index.css') {

    fs.readFile('index.css', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/index.js') {

    fs.readFile('index.js', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/js' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/solo.html') {

    fs.readFile('solo.html', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/solo.css') {

    fs.readFile('solo.css', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/solo.js') {

    fs.readFile('solo.js', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/js' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/1v1.html') {

    fs.readFile('1v1.html', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/1v1.css') {

    fs.readFile('1v1.css', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      return res.end();
    });
}
else if (req.url === '/1v1.js') {

    fs.readFile('1v1.js', function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/js' });
      res.write(data);
      return res.end();
    });
}
else {
    // Handle other routes or files
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });
  