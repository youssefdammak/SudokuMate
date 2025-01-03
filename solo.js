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
const easyBtn=document.getElementById('easy');
const mediumBtn=document.getElementById('medium');
const hardBtn=document.getElementById('hard');

let grid,puzzle,solved_puzzle, originalPuzzle, userPuzzle;

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

solutionBtn.addEventListener('click', ()=>{
    solve(grid);
    solved_puzzle=grid_to_string(grid);
    getSolution(solved_puzzle,puzzle)
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