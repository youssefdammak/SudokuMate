const socket=io();
/*sudoku functions*/

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const N=9;

hamburger.addEventListener('click', function () {
  mobileNav.classList.toggle('hidden');
});

function renderGrid(puzzle) {
    const gridElement = document.getElementById('sudoku-grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < puzzle.length; i++) {
      const cell = document.createElement('div');
      if (puzzle[i] === '0') {
        const input = document.createElement('input');
        input.className='empty';
        input.type = 'text';
        input.maxLength = 1;
        input.oninput = (e) => {
          if (!/^[1-9]$/.test(e.target.value)) {
            e.target.value = '';
          }
        };
        cell.appendChild(input);
      } else {
        cell.textContent = puzzle[i];
      }
      gridElement.appendChild(cell);
    }
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

/*---------------------*/

const difficulty=document.getElementById('difficulty');
const easyBtn=document.getElementById('easy');
const mediumBtn=document.getElementById('medium');
const hardBtn=document.getElementById('hard');

const lobbyButtons=document.getElementById('lobby-buttons');
const username=document.getElementById('username');
const username_input=document.getElementById('username-input');
const joinRoom=document.getElementById('joinroom');
const createRoom=document.getElementById('createroom');
const joinRoomBtn=document.getElementById('join-room');
const joinBtn=document.getElementById('join');
const createRoomBtn=document.getElementById('create-room');
const continueBtn=document.getElementById('continue');
const room_id=document.getElementById('room-id');
const ready=document.getElementById('ready');
const readyBtn=document.getElementById('readyBtn');
const validateBtn=document.getElementById('validate');

lobbyButtons.style.display='flex';
createRoomBtn.addEventListener('click', () => {
    lobbyButtons.style.display = 'none';
    difficulty.style.display = 'flex';

    easyBtn.addEventListener('click', () => {
        difficulty.style.display = 'none';
        username.style.display = 'flex';

        continueBtn.addEventListener('click', () => {
            const usernameValue = username_input.value;
            console.log('Captured username before emit:', usernameValue); 
            if (!usernameValue) {
                console.log('Error: Username is empty!'); 
                return;
            }
            username.style.display = 'none';
            createRoom.style.display = 'flex';
            socket.emit('createRoom', 0, usernameValue);

            socket.on('roomCreated', (roomId) => {
                console.log(`Room created with ID: ${roomId}`);
                room_id.textContent = roomId;
            });
        });
    });
    mediumBtn.addEventListener('click',()=>{
        difficulty.style.display='none';
        username.style.display='flex';
        continueBtn.addEventListener('click',()=>{
            username.style.display='none';
            createRoom.style.display='flex';
        });
        socket.emit('createRoom',35,username_input.value);
        socket.on('roomCreated',(roomId)=>{
            console.log(`Room created with ID: ${roomId}`);
            room_id.textContent=roomId;
        });
    
        
    });
    hardBtn.addEventListener('click',()=>{
        difficulty.style.display='none';
        username.style.display='flex';
        continueBtn.addEventListener('click',()=>{
            username.style.display='none';
            createRoom.style.display='flex';
        });
        socket.emit('createRoom',45,username_input.value);
        socket.on('roomCreated',(roomId)=>{
            console.log(`Room created with ID: ${roomId}`);
            room_id.textContent=roomId;
        });
    
        
    });

    
});
joinRoomBtn.addEventListener('click',()=>{
    lobbyButtons.style.display='none';
    username.style.display='flex';
    continueBtn.addEventListener('click',()=>{
        username.style.display='none';
        joinRoom.style.display='flex';
        joinBtn.addEventListener('click',()=>{
            const roomId = document.getElementById('room-id-input').value;
            socket.emit('joinRoom', roomId,username_input.value);
        });
    });
});
socket.on('playerJoined', (players) => {
    console.log('Players in the room:'+ players);
    alert(players[1]+' joined the room!');
});
socket.on('error', (message) => {
    console.log('Error:', message);
    alert(message);
  });
socket.on('roomReady',(roomId)=>{
    joinRoom.style.display='none';
    createRoom.style.display='none';
    ready.style.display='flex';
});
readyBtn.addEventListener('click',()=>{
    socket.emit('playerReady',(document.getElementById('room-id-input').value));
    socket.emit('playerReady',(room_id.textContent));
    ready.style.display='none';
});
const game_header=document.getElementById('game-header');
socket.on('startGame',(puzzle,roomId)=>{
    renderGrid(puzzle);
    validateBtn.addEventListener('click',()=>{
        const input=document.querySelectorAll('.empty');
        userPuzzle="";
        let j=0;
        for(let i=0 ;i<puzzle.length;i++){
            if (puzzle[i]==='0'){
                userPuzzle+=input[j].value ||'0';
                j+=1
            }
            else{
                userPuzzle+=puzzle[i];
            }
        }
        socket.emit('validateSolution',userPuzzle,roomId,socket.id);
    });
});
socket.on('winner',(username)=>{
    alert(username+' Solved the puzzle! 🎉');
    const gridElement = document.getElementById('sudoku-grid');
    gridElement.innerHTML = '';
});
socket.on('tryAgain',()=>{
    alert("Incorrect. Try again! ❌");
});
