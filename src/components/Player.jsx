import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  // Function to handle the edit button click
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  // Function to handle the input change
  // This function updates the player name when the input value changes
  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input type="text" required value={playerName} onChange={handleChange} />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
