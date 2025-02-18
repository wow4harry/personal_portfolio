// Board size can be changed here if desired.
const BOARD_SIZE = 15;

// Internal representation of the board:
// null = empty, 'B' = black stone, 'W' = white stone
let boardState = [];

// Track the current player ('B' for Black, 'W' for White).
let currentPlayer = 'B';

// Flag to indicate if the game is over.
let gameOver = false;

// References to HTML elements.
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');

// Initialize the board when the page loads.
initBoard();

// Reset button click event to restart the game.
resetButton.addEventListener('click', initBoard);

/**
 * Set up a fresh board, clear previous state, and build the table cells.
 */
function initBoard() {
  // Clear any existing rows in the table.
  boardElement.innerHTML = '';

  // Reset all variables to default.
  boardState = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  currentPlayer = 'B';
  gameOver = false;
  messageElement.textContent = '';

  // Generate rows and cells for the board.
  for (let r = 0; r < BOARD_SIZE; r++) {
    const row = document.createElement('tr');
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = document.createElement('td');
      // When a cell is clicked, place a stone if possible.
      cell.addEventListener('click', () => makeMove(r, c));
      row.appendChild(cell);
    }
    boardElement.appendChild(row);
  }
}

/**
 * Place a stone on the board if valid, then check for a win condition.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 */
function makeMove(row, col) {
  // If the game is over or the cell is occupied, do nothing.
  if (gameOver || boardState[row][col] !== null) return;

  // Place the current player's stone.
  boardState[row][col] = currentPlayer;

  // Update the UI.
  const cell = boardElement.rows[row].cells[col];
  cell.innerHTML = currentPlayer === 'B' ? stoneHTML('black') : stoneHTML('white');

  // Check if this move leads to a win.
  if (checkWin(row, col, currentPlayer)) {
    messageElement.textContent = (currentPlayer === 'B' ? 'Black' : 'White') + ' wins!';
    gameOver = true;
    return;
  }

  // Switch to the other player.
  currentPlayer = currentPlayer === 'B' ? 'W' : 'B';
}

/**
 * Return the HTML string for a colored stone.
 * @param {string} colorClass - The CSS class for the stone ('black' or 'white').
 * @returns {string} HTML string for the stone.
 */
function stoneHTML(colorClass) {
  return `<div class="${colorClass}"></div>`;
}

/**
 * Check if the current player has five in a row after placing a stone.
 * @param {number} row - The row of the last move.
 * @param {number} col - The column of the last move.
 * @param {string} player - 'B' or 'W'.
 * @returns {boolean} True if the player has a winning line, otherwise false.
 */
function checkWin(row, col, player) {
  // Directions to check: horizontal, vertical, diagonal (down-right), diagonal (up-right)
  const directions = [
    { dr: 0, dc: 1 },  // horizontal
    { dr: 1, dc: 0 },  // vertical
    { dr: 1, dc: 1 },  // diagonal down-right
    { dr: 1, dc: -1 }, // diagonal up-right
  ];

  for (let i = 0; i < directions.length; i++) {
    const { dr, dc } = directions[i];
    // Count consecutive stones (start with 1 for the current stone).
    let count = 1;

    // Check the "forward" direction (dr, dc).
    count += countStones(row, col, dr, dc, player);

    // Check the "backward" direction (-dr, -dc).
    count += countStones(row, col, -dr, -dc, player);

    // If 5 or more in a row, current player wins.
    if (count >= 5) {
      return true;
    }
  }
  return false;
}

/**
 * Count how many consecutive stones belong to the given player
 * starting from position (row, col) in direction (dr, dc), excluding the starting cell.
 */
function countStones(row, col, dr, dc, player) {
  let consecutive = 0;
  let r = row + dr;
  let c = col + dc;

  while (
    r >= 0 &&
    r < BOARD_SIZE &&
    c >= 0 &&
    c < BOARD_SIZE &&
    boardState[r][c] === player
  ) {
    consecutive++;
    r += dr;
    c += dc;
  }
  return consecutive;
}