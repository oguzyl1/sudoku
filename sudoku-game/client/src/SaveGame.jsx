import React, { useState, useEffect } from "react";
import axios from "axios";

function SavedGamesScreen({
  setCells,
  setDifficulty,
  setSkorCount,
  setMistake,
  setGameStarted,
}) {
  const [savedGames, setSavedGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const userId = localStorage.getItem("userId"); // userId'yi buradan al

  useEffect(() => {
    const fetchSavedGames = async () => {
      if (!userId) {
        console.error("Kullanıcı kimliği bulunamadı.");
        return;
      }
    
      try {
        const response = await axios.get(
          `http://localhost:5000/api/games/user/${userId}`
        );
        setSavedGames(response.data);
      } catch (error) {
        console.error("Kayıtlı oyunları yüklerken hata oluştu:", error);
      }
    };

    fetchSavedGames();
  }, [userId]); // userId'yi bağımlılıklar dizisine ekleyin

  const handleGameClick = async (gameId) => {
    setSelectedGameId(gameId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/games/load/${gameId}`
      );
      const gameData = response.data;

      setCells(gameData.board);
      setDifficulty(gameData.difficulty);
      setSkorCount(gameData.score);
      setMistake(gameData.mistakesLeft);
      setGameStarted(true);
    } catch (error) {
      console.error("Oyun yüklenirken hata oluştu:", error);
    }
  };

  return (
    <div className="saved-games-screen">
      <h1 className="saved-games-h1">Kayıtlı Oyunlar</h1>
      <ul className="saved-games-list">
        {savedGames.length > 0 ? (
          savedGames.map((game) => (
            <li
              key={game._id}
              onClick={() => handleGameClick(game._id)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              {game.name}
            </li>
          ))
        ) : (
          <p>Kayıtlı oyun bulunamadı.</p>
        )}
      </ul>
      {selectedGameId && <p>Seçili Oyun ID: {selectedGameId}</p>}
    </div>
  );
}

export default SavedGamesScreen;
