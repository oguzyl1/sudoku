import React from 'react';
import PropTypes from 'prop-types';

function GameInfo({ level, onLevelChange, playerName }) {
  const handleClick = () => {
    let newLevel;
    if (level === "Kolay") {
      newLevel = "Orta";
    } else if (level === "Orta") {
      newLevel = "Zor";
    } else {
      newLevel = "Kolay";
    }
    if (onLevelChange && typeof onLevelChange === 'function') {
      onLevelChange(newLevel);
    } else {
      console.error('onLevelChange işlevi geçerli değil.');
    }
  };

  return (
    <div className="game-info">
      <div className="game-info-box game-info-name">{playerName || "Oyuncu Adı"}</div>
      <div
        className="game-info-box game-info-level"
        onClick={handleClick}
      >
        {level}
      </div>
    </div>
  );
}

GameInfo.propTypes = {
  level: PropTypes.string.isRequired,
  onLevelChange: PropTypes.func.isRequired,
  playerName: PropTypes.string
};

export default GameInfo;
