// client/src/NavBar.jsx
import { useNavigate } from "react-router-dom";

function NavBar({ onNewGame, onSaveGame, onLoadSavedGames }) {
  const navigate = useNavigate();

  const handleNewGame = () => {
    onNewGame();
    navigate("/");
  };

  const handleSaveGame = () => {
    onSaveGame();
  };

  const handleLoadSavedGames = () => {
    onLoadSavedGames();
    navigate("/saved-games");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">Sudoku</div>
        <div className="nav-buttons">
          <button className="nav-btn" onClick={handleNewGame}>
            Yeni Oyun
          </button>
          <button className="nav-btn" onClick={handleLoadSavedGames}>
            Kayıtlı Oyunlar
          </button>
          <button className="nav-btn" onClick={handleSaveGame}>
            Oyunu Kaydet
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
