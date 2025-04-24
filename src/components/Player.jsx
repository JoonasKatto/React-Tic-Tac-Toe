import { useState } from 'react';

export default function Player({name, symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    // Function to handle the edit button click
    const handleEditClick = () => {
        setIsEditing(editing => !editing);
    };

    return (
        <li>
            <span className="player">
                {!isEditing ? <span className="player-name">{name}</span> : <input type="text" required value={name} />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}