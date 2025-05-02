import { useState } from 'react';

import Player from './components/Player.jsx'; // Component to display player information
import GameBoard from './components/GameBoard.jsx'; // Component to render the Tic-Tac-Toe board
import Log from './components/Log.jsx'; // Component to display the log of moves
import GameOver from './components/GameOver.jsx'; // Component to display the game-over screen
import { WINNING_COMBINATIONS } from './winning-combinations.js'; // Predefined winning combinations for the game

// Constants for player names
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// Initial empty game board (3x3 grid)
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/* 
Function to determine the active player based on the game turns

The gameTurns object is an array of objects, where each object represents a single move in the game
Example Structure of gameTurns:
[
  { square: { row: 0, col: 1 }, player: 'X' },
  { square: { row: 1, col: 2 }, player: 'O' },
  { square: { row: 2, col: 0 }, player: 'X' }
]
*/
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // If the first turn was made by Player X, the next turn is Player O
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

/* 
Function to compute the current state of the game board based on the game turns

Example Structure of gameBoard (returned by this function):
[
  ['X', 'O', null],
  ['O', 'X', null],
  [null, null, 'X']
]
*/
function deriveGameBoard(gameTurns) {
  // Create a deep copy of the initial game board to avoid modifying the original
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Apply each turn to the game board
  for (const turn of gameTurns) {
    const { square, player } = turn; // Destructure the square and player from the turn
    const { row, col } = square; // Get the row and column of the square

    gameBoard[row][col] = player; // Mark the square with the player's symbol
  }

  return gameBoard; // Return the updated game board
}

/*
Function to determine the winner based on the current game board
The returned value is the name of the winning player or undefined if there's no winner
*/
function deriveWinner(gameBoard, players) {
  let winner;

  // Check each winning combination
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // If all three squares in a combination have the same symbol, we have a winner
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Map the symbol to the player's name
    }
  }

  return winner; // Return the winner (or undefined if no winner)
}

function App() {
  // State to manage player names
  const [players, setPlayers] = useState(PLAYERS);

  // State to track the history of game turns
  const [gameTurns, setGameTurns] = useState([]);

  // Derived values based on the game state
  const activePlayer = deriveActivePlayer(gameTurns); // Determine the current active player
  const gameBoard = deriveGameBoard(gameTurns); // Compute the current game board
  const winner = deriveWinner(gameBoard, players); // Determine the winner (if any)
  const hasDraw = gameTurns.length === 9 && !winner; // Check if the game ended in a draw

  // Handler for selecting a square on the game board
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // Determine the current player

      // Add the new turn to the history of game turns
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns; // Update the state with the new turn
    });
  }

  // Handler to restart the game
  function handleRestart() {
    setGameTurns([]); // Reset the game turns
  }

  // Handler to change a player's name
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers, // Copy the previous players
        [symbol]: newName, // Update the name for the specified player
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Display the players */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Display the game-over screen if there's a winner or a draw */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        {/* Render the game board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      {/* Display the log of moves */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
