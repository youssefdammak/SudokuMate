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

const validateBtn=document.getElementById('validate');
const resetBtn=document.getElementById('reset');
const solutionBtn=document.getElementById('solution');
const game_buttons=document.getElementById('game-buttons');
const easyBtn=document.getElementById('easy');
const mediumBtn=document.getElementById('medium');
const hardBtn=document.getElementById('hard');
const normalBtn=document.getElementById('normal');
const timedBtn=document.getElementById('timed');
const survivalBtn=document.getElementById('survival');
const difficulty=document.getElementById('difficulty');
const modes=document.getElementById('modes');
const time_choice=document.getElementById('time_choice');
const fiveBtn=document.getElementById('5min');
const tenBtn=document.getElementById('10min');
const fifteenBtn=document.getElementById('15min');
const timer=document.getElementById('timer');
const timer_box=document.getElementById('timer-box');
let grid,puzzle,solved_puzzle, originalPuzzle, userPuzzle;

normalBtn.addEventListener('click',()=>{
    difficulty.style.display='flex';
    modes.style.display='none';
    easyBtn.addEventListener('click', () => {
        grid=generateSudoku(25);
        puzzle=grid_to_string(grid);
        originalPuzzle=puzzle;
        renderGrid(puzzle);
    });
    mediumBtn.addEventListener('click', () => {
        grid=generateSudoku(35);
        puzzle=grid_to_string(grid);
        originalPuzzle=puzzle;
        renderGrid(puzzle);
    });
    hardBtn.addEventListener('click', () => {
        grid=generateSudoku(45);
        puzzle=grid_to_string(grid);
        originalPuzzle=puzzle;
        renderGrid(puzzle);
    });
});
timedBtn.addEventListener('click',()=>{
    difficulty.style.display='flex';
    modes.style.display='none';
    easyBtn.addEventListener('click', () => {
        time_choice.style.display='flex';
        difficulty.style.display='none';
        fiveBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='300';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=300;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        tenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='600';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=600;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        fifteenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='900';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=900;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
    });
    mediumBtn.addEventListener('click', () => {
        time_choice.style.display='flex';
        difficulty.style.display='none';
        fiveBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='300';
            time_choice.style.display='none';
            grid=generateSudoku(35);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=300;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        tenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='600';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=600;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        fifteenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='900';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=900;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
    });
    hardBtn.addEventListener('click', () => {
        time_choice.style.display='flex';
        difficulty.style.display='none';
        fiveBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='300';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=300;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        tenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='600';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=600;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
        fifteenBtn.addEventListener('click',()=>{
            timer.style.display='flex';
            timer_box.textContent='900';
            time_choice.style.display='none';
            grid=generateSudoku(25);
            puzzle=grid_to_string(grid);
            originalPuzzle=puzzle;
            renderGrid(puzzle);
            let current_time=900;
            const time = setInterval(() => {
                if (current_time <= 0) {
                    clearInterval(time);
                    alert("Time's up! Press Ok to see the solution");
                    solve(grid);
                    solved_puzzle=grid_to_string(grid);
                    getSolution(solved_puzzle,puzzle);
                    game_buttons.style.display='none';
                } else {
                    current_time--;
                    timer_box.textContent = current_time;
                }
            }, 1000);
        });
    });
});
solutionBtn.addEventListener('click', ()=>{
    solve(grid);
    solved_puzzle=grid_to_string(grid);
    getSolution(solved_puzzle,puzzle);
});
resetBtn.addEventListener('click', () => {
    renderGrid(originalPuzzle);
});
validateBtn.addEventListener('click', ()=>{
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
    solve(grid);
    solved_puzzle=grid_to_string(grid);
    if(solved_puzzle===userPuzzle){
        alert("Correct! 🎉");
    }
    else{
        alert("Incorrect. Try again! ❌");
    }
});