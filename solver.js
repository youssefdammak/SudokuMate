const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const N=9;

hamburger.addEventListener('click', function () {
  mobileNav.classList.toggle('hidden');
});

function renderGrid() {
    const gridElement = document.getElementById('sudoku-grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
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
        empty_cells[i].value=solved_puzzle[i];
    }
}
function hasUniqueSolution(grid) {
    let solutions = 0;

    function countSolutions(grid) {
        if (solutions > 1) return; // Stop if more than one solution is found

        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (grid[row][col] === 0) { // Find an empty cell
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(grid, row, col, num)) {
                            grid[row][col] = num; // Place the number
                            countSolutions(grid); // Recurse
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return; // Exit if we've processed this cell
                }
            }
        }
        solutions++; // Increment when a solution is found
    }

    // Handle edge case: Fully filled grids
    if (grid.every(row => row.every(cell => cell !== 0))) {
        return true; // Already a valid solution
    }

    countSolutions(grid);
    return solutions === 1;
}
function grid_to_string(grid) {
    return grid.flat().join('');
}
function string_to_grid(puzzle) {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push(puzzle.slice(i * 9, (i + 1) * 9).split('').map(Number));
    }
    return grid;
}
const resetBtn=document.getElementById('reset');
const solutionBtn=document.getElementById('solution');

let userGrid,solved_puzzle, userPuzzle;
renderGrid();
solutionBtn.addEventListener('click', ()=>{
    const input=document.querySelectorAll('.empty');
    userPuzzle="";
    for(let i=0 ;i<input.length;i++){
        userPuzzle += input[i].value ? input[i].value : '0';
    }
    userGrid=string_to_grid(userPuzzle);
    if(hasUniqueSolution(userGrid)){
        solve(userGrid);
        solved_puzzle=grid_to_string(userGrid);
        console.log(solved_puzzle);
        getSolution(solved_puzzle,userPuzzle);
    }
    else{
        alert("this grid doesn't have a unique solution")
    }

});
resetBtn.addEventListener('click', () => {
    renderGrid();
});
