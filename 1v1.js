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


/*---------------------*/

const difficulty=document.getElementById('difficulty');
const lobbyButtons=document.getElementById('lobby-buttons');
const username=document.getElementById('username');
const joinRoom=document.getElementById('joinroom');
const createRoom=document.getElementById('createroom');
const joinRoomBtn=document.getElementById('join-room');
const joinBtn=document.getElementById('join');
const createRoomBtn=document.getElementById('create-room');
const continueBtn=document.getElementById('continue');
const room_id=document.getElementById('room-id');
lobbyButtons.style.display='flex';
createRoomBtn.addEventListener('click',() =>{
    socket.emit('createRoom');
    socket.on('roomCreated',(roomId)=>{
        console.log(`Room created with ID: ${roomId}`);
        room_id.textContent=roomId;
    });
    lobbyButtons.style.display='none';
    username.style.display='flex';
    continueBtn.addEventListener('click',()=>{
        username.style.display='none';
        createRoom.style.display='flex';
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
            socket.emit('joinRoom', roomId);
        });
    });
});
socket.on('playerJoined', (players) => {
    console.log('Players in the room:', players);
    alert('Another player joined the room!');
});
socket.on('error', (message) => {
    console.log('Error:', message);
    alert(message);
  });
socket.on('playersReady',(puzzle)=>{
    renderGrid(puzzle);
});