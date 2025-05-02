import { useState } from 'react';

// The Player component displays information about a player and allows editing their name.
// Props:
// - `initialName`: The initial name of the player.
// - `symbol`: The player's symbol (e.g., 'X' or 'O').
// - `isActive`: A boolean indicating if the player is currently active.
// - `onChangeName`: A function to handle name changes.
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // State to manage the player's name
  const [playerName, setPlayerName] = useState(initialName);

  // State to track whether the name is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Toggles the editing state and saves the name when exiting edit mode
  function handleEditClick() {
    setIsEditing((editing) => !editing);

    // If exiting edit mode, call the onChangeName function to save the new name
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Updates the playerName state as the input value changes
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // Default display for the player's name (non-editable)
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  // If the player is in edit mode, render an input field instead
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      {/* Display the player's name and symbol */}
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Button to toggle between edit and save modes */}
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
