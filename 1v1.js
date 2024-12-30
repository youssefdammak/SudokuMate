var http = require('http');
var fs = require('fs');
var socketIo = require('socket.io');

// Create the HTTP server
var server = http.createServer(function (req, res) {
  if (req.url === '/' || req.url === '/index.html') {
    // Serve the HTML file
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
  } else if (req.url === '/index.css') {
    // Serve the CSS file
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
  } else {
    // Handle other routes or files
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

// Attach Socket.IO to the server
var io = socketIo(server);

// Handle a new socket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  // Emit a message to all connected clients (including the new one)
  io.emit('user connected', 'A user has connected!');
  
  // When the user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('user disconnected', 'A user has disconnected!');
  });
});

// Start the server
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
