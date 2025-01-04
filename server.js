var http = require('http');
var fs = require('fs');
const socketIo = require('socket.io');


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
else if (req.url === '/solver.html') {

  fs.readFile('solver.html', function (err, data) {
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
else if (req.url === '/solver.css') {

  fs.readFile('solver.css', function (err, data) {
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
else if (req.url === '/solver.js') {

  fs.readFile('solver.js', function (err, data) {
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
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});
const N=9;

function isSafe(grid, row, col, num) {
  for (let x = 0; x < N; x++) {
      if (grid[row][x] === num) {
          return false;
      }
  }
  for (let x = 0; x < N; x++) {
      if (grid[x][col] === num) {
          return false;
      }
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (grid[startRow + i][startCol + j] === num) {
              return false;
          }
      }
  }
  return true;
}
function solve(grid) {
  for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
          if (grid[row][col] === 0) { // Find an empty cell
              for (let num = 1; num <= 9; num++) { // Try numbers 1-9
                  if (isSafe(grid, row, col, num)) {
                      grid[row][col] = num; // Place the number

                      if (solve(grid)) {
                          return true; // Continue solving recursively
                      }

                      grid[row][col] = 0; // Reset if no solution found
                  }
              }
              return false; // If no number works, backtrack
          }
      }
  }
  return true; // Puzzle solved
}
function getSolution(solved_puzzle,puzzle){
  const empty_cells=document.querySelectorAll('.empty');
  let j=0;
  for (let i=0;i<puzzle.length;i++){
      if (parseInt(puzzle[i])==0){
          empty_cells[j].value=solved_puzzle[i];
          j+=1
      }
  }
}
function removeNumbers(grid, difficulty) {
  let attempts = difficulty;
  while (attempts > 0) {
      const row = Math.floor(Math.random() * N);
      const col = Math.floor(Math.random() * N);

      if (grid[row][col] !== 0) {
          const backup = grid[row][col];
          grid[row][col] = 0;

          const gridCopy = grid.map(row => [...row]);
          if (!hasUniqueSolution(gridCopy)) {
              grid[row][col] = backup; // Restore the number
              attempts--;
          }
      }
  }
  return grid;
}
function hasUniqueSolution(grid) {
  let solutions = 0;

  function countSolutions(grid) {
      for (let row = 0; row < N; row++) {
          for (let col = 0; col < N; col++) {
              if (grid[row][col] === 0) {
                  for (let num = 1; num <= 9; num++) {
                      if (isSafe(grid, row, col, num)) {
                          grid[row][col] = num;
                          countSolutions(grid);
                          grid[row][col] = 0;
                      }
                  }
                  return;
              }
          }
      }
      solutions++;
  }

  countSolutions(grid);
  return solutions === 1;
}
function fillGrid(grid) {
  for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
          if (grid[row][col] === 0) {
              const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5); // Randomize numbers
              for (let num of numbers) {
                  if (isSafe(grid, row, col, num)) {
                      grid[row][col] = num;
                      if (fillGrid(grid)) return true;
                      grid[row][col] = 0;
                  }
              }
              return false;
          }
      }
  }
  return true;
}
function generateSudoku(difficulty) {
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  fillGrid(grid); // Fill the grid with a complete solution
  return removeNumbers(grid, difficulty); // Remove numbers to create the puzzle
}
function grid_to_string(grid){
  let puzzle="";
  for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
          puzzle+=String(grid[i][j]);
      }
  }
  return puzzle;
}

const io = socketIo(server);

let rooms = {}; // Object to track rooms and their players

io.on('connection',(socket)=>{
  console.log('A user connected :',socket.id);
  
  socket.on('createRoom',(difficulty,username)=>{
    const roomId=Math.random().toString(36).substring(2,6);
    socket.join(roomId);
    rooms[roomId]={
      players : [socket.id],
      usernames: [username],
      puzzleDifficulty : difficulty,
      readyCount:0,
      grid: null,
      puzzle:null,
    };
    console.log(`Room created: ${roomId} with difficulty ${difficulty}`);
    socket.emit('roomCreated', roomId);
  });

  socket.on('joinRoom',(roomId,username)=>{
    if(rooms[roomId] && rooms[roomId].players.length<2){
      socket.join(roomId);
      rooms[roomId].players.push(socket.id);
      rooms[roomId].usernames.push(username);
      if (rooms[roomId].players.length>1){
        io.to(rooms[roomId].players[0]).emit('playerJoined', rooms[roomId].usernames); // Notify all players in the room
      }
      console.log(`Player joined room: ${roomId}`);
    } else {
      socket.emit('error', 'Room not available'); // Send an error message if room is full or doesn't exist
    }
    if(rooms[roomId] && rooms[roomId].players.length==2){
      io.to(roomId).emit('roomReady', roomId);
    }
  });
  socket.on('playerReady', (roomId) => {
    if (rooms[roomId]) {
        rooms[roomId].readyCount++;

        console.log(`Player ready in room: ${roomId}, Ready count: ${rooms[roomId].readyCount}`);

        if (rooms[roomId].readyCount === 2) {
            const grid=generateSudoku(rooms[roomId].puzzleDifficulty);
            const puzzle=grid_to_string(grid);
            rooms[roomId].grid=grid;
            rooms[roomId].puzzle=puzzle;
            io.to(roomId).emit('startGame', puzzle,roomId); // Emit puzzle when both players are ready
        }
    }
  });
  socket.on('validateSolution',(userPuzzle,roomId,playerId)=>{
    solve(rooms[roomId].grid);
    solvedPuzzle=grid_to_string(rooms[roomId].grid);
    if(solvedPuzzle===userPuzzle && rooms[roomId].players[0]===playerId){
      io.to(roomId).emit('winner', rooms[roomId].usernames[0]);
    }
    else if(solvedPuzzle===userPuzzle && rooms[roomId].players[1]===playerId){
      io.to(roomId).emit('winner', rooms[roomId].usernames[1]);
    }
    else if(rooms[roomId].players[0]===playerId){
      io.to(rooms[roomId].players[0]).emit('tryAgain');
    }
    else{
      io.to(rooms[roomId].players[1]).emit('tryAgain');
    }
  });
  
});





server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });
  