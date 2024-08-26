import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SavedGamesScreen({
  onGameSelect,
  setCells,
  setDifficulty,
  setSkorCount,
  setMistake,
  setGameStarted,
}) {
  const [savedGames, setSavedGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // useNavigate doğru bir şekilde kullanıldı

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
  }, [userId]);

  const handleDeleteGame = async (gameId) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${gameId}`);
      setSavedGames((prev) => prev.filter((game) => game._id !== gameId));
      if (selectedGameId === gameId) {
        setSelectedGameId(null);
      }
    } catch (error) {
      console.error("Oyun silinirken hata oluştu:", error);
    }
  };

  const handleGameClick = async (gameId) => {
    setSelectedGameId(gameId);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/games/${gameId}`
      );
      const gameData = response.data;

      setCells(gameData.board);
      setDifficulty(gameData.difficulty);
      setSkorCount(Number(gameData.score));
      setMistake(gameData.mistakesLeft);
      setGameStarted(true);

      if (onGameSelect) {
        onGameSelect(gameData);
      }

      navigate("/");

      console.log("Oyun dataları yükleniyor: ", gameData);
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
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => handleGameClick(game._id)}
                style={{ cursor: "pointer", flexGrow: 1 }}
              >
                {game.name}
              </span>
              <button
                className="saved-game-delete-btn"
                onClick={() => handleDeleteGame(game._id)}
              >
                Sil
              </button>
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
