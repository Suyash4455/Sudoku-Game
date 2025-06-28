const grid = document.getElementById('sudoku-grid');

// Create input fields
for (let i = 0; i < 81; i++) {
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.setAttribute('max', '9');
  input.setAttribute('maxlength', '1');
  grid.appendChild(input);
}

// Helper to get grid values
function getGridValues() {
  const inputs = document.querySelectorAll('input');
  const values = [];
  for (let i = 0; i < 9; i++) {
    values.push([]);
    for (let j = 0; j < 9; j++) {
      const val = inputs[i * 9 + j].value;
      values[i].push(val ? parseInt(val) : 0);
    }
  }
  return values;
}

// Helper to set grid values
function setGridValues(board) {
  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      inputs[i * 9 + j].value = board[i][j] !== 0 ? board[i][j] : '';
    }
  }
}

// Check if it's safe to place number
function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)]
              [3 * Math.floor(col / 3) + x % 3] === num) {
      return false;
    }
  }
  return true;
}

// Backtracking solver
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Main function to solve Sudoku
function solveSudoku() {
  const board = getGridValues();
  if (solve(board)) {
    setGridValues(board);
    alert("Sudoku Solved!");
  } else {
    alert("No solution exists!");
  }
}
