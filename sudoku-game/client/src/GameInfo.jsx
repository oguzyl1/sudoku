import React from 'react';

function GameInfo({ level, onLevelChange ,playerName}) {
  const handleClick = () => {
    let newLevel;
    if (level === "Kolay") {
      newLevel = "Orta";
    } else if (level === "Orta") {
      newLevel = "Zor";
    } else {
      newLevel = "Kolay";
    }
    onLevelChange(newLevel);
  };

  return (
    <div className="game-info">
      <div className="game-info-box game-info-name">{playerName}</div>
      <div
        className="game-info-box game-info-level"
        onClick={handleClick}
      >
        {level}
      </div>
    </div>
  );
}

export default GameInfo;
