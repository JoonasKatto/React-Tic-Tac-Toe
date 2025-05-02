// The GameBoard component renders the Tic-Tac-Toe game board.
// It takes two props:
// - `onSelectSquare`: A function to handle when a square is clicked.
// - `board`: A 2D array representing the current state of the game board.
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {/* Iterate over each row in the board */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* Iterate over each square in the row */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Render a button for each square */}
                <button
                  // Call the onSelectSquare function with the row and column index when clicked
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // Disable the button if the square is already occupied
                  disabled={playerSymbol !== null}
                >
                  {/* Display the player's symbol (X or O) in the square */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
