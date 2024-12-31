const difficulty=document.getElementById('difficulty');
const lobbyButtons=document.getElementById('lobby-buttons');
const username=document.getElementById('username');
const joinRoom=document.getElementById('joinroom');
const createRoom=document.getElementById('createroom');
const joinRoomBtn=document.getElementById('join-room');
const createRoomBtn=document.getElementById('create-room');
const continueBtn=document.getElementById('continue');
lobbyButtons.style.display='flex';
createRoomBtn.addEventListener('click',() =>{
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
    });
});