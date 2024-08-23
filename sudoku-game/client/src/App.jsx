import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import StartScreen from "./StartScreen.jsx";
import RegisterScreen from "./RegisterScreen.jsx";
import NavBar from "./NavBar.jsx";
import SudokuGrid from "./SudokuGrid.jsx";
import GameInfo from "./GameInfo.jsx";
import NumberPad from "./NumberPad.jsx";
import SkorBoard from "./SkorBoard.jsx";
import Mistake from "./Mistake.jsx";
import { initializeCells } from "./utils/initializeCells.js";
import { handleNumberClick } from "./utils/handleNumberClick.js";
import SavedGamesScreen from "./SaveGame.jsx";

function App() {
  const [cells, setCells] = useState(
    Array(81).fill({ value: "", locked: false })
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState("Kolay");
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [skorCount, setSkorCount] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // İlgili state eklenmeli

  const handleStart = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleLevelChange = (newLevel) => {
    setDifficulty(newLevel);
  };

  const handleNewGame = () => {
    setCells(Array(81).fill({ value: "", locked: false }));
    initializeCells(30, setCells);
    setSelectedCell(null);
    setSkorCount(0);
    setMistake(5);
    setGameStarted(true);
  };

  const handleSaveGame = async () => {
    if (!playerName) {
      alert("Lütfen önce bir oyun başlatın!");
      return;
    }

    const gameName = prompt("Oyununuz için bir isim girin:");
    if (!gameName) {
      alert("Geçerli bir oyun ismi girin.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId"); // userId'yi localStorage'dan al
      if (!userId) {
        alert("Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/games/save",
        {
          user: userId, // userId'yi gönder
          board: cells,
          difficulty: difficulty,
          score: skorCount,
          mistakesLeft: mistake,
          completed: false,
          name: gameName,
        }
      );

      if (response.status === 201) {
        alert("Oyun başarıyla kaydedildi!");
      }
    } catch (error) {
      console.error("Oyun kaydedilirken hata oluştu:", error);
      alert("Oyun kaydedilirken bir hata oluştu.");
    }
  };

  const handleLoadSavedGames = async () => {
    try {
      const userId = localStorage.getItem('userId'); // userId'yi localStorage'dan al
      if (!userId) {
        alert("Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.");
        return [];
      }

      const response = await axios.get(
        `http://localhost:5000/api/games/user/${userId}` // Kullanıcı ID'si ile oyunları yükle
      );
      if (response.status === 200) {
        return response.data; // Bu veri, kullanıcıya gösterilecek oyunların listesini içermelidir.
      }
    } catch (error) {
      console.error("Kullanıcının oyunları yüklenirken hata oluştu:", error);
      alert("Oyunlar yüklenirken bir hata oluştu.");
      return [];
    }
  };

 // API çağrısını gameId ile yap
const handleLoadSavedGameById = async (gameId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/games/${gameId}`
    );
    if (response.status === 200) {
      const savedGame = response.data;
      setCells(savedGame.board);
      setDifficulty(savedGame.difficulty);
      setSkorCount(savedGame.score);
      setMistake(savedGame.mistakesLeft);
      setGameStarted(true);

      if (savedGame.mistakesLeft === 0) {
        setIsGameOver(true);
        alert("Bu oyun bitmiş! Yeni bir oyun başlatmanız gerekiyor.");
      } else {
        setIsGameOver(false);
      }

      alert("Oyun başarıyla yüklendi!");
    }
  } catch (error) {
    console.error("Yüklenmiş oyunları getirirken hata oluştu:", error);
    alert("Yüklenmiş oyunları getirirken bir hata oluştu.");
  }
};

  useEffect(() => {
    let numOfCellsToFill;

    if (difficulty === "Kolay") {
      numOfCellsToFill = 30;
      setMistake(5);
    } else if (difficulty === "Orta") {
      numOfCellsToFill = 20;
      setMistake(4);
    } else if (difficulty === "Zor") {
      numOfCellsToFill = 10;
      setMistake(3);
    }

    initializeCells(numOfCellsToFill, setCells);
    setSkorCount(0);
  }, [difficulty]);

  return (
    <div className="main">
      <NavBar
        onNewGame={handleNewGame}
        onSaveGame={handleSaveGame}
        onLoadSavedGames={handleLoadSavedGames}
      />
      <Routes>
        <Route
          path="/"
          element={
            gameStarted ? (
              <div className="game-screen">
                <div className="mistake-and-score">
                  <SkorBoard skorCount={skorCount} />
                  <Mistake mistake={mistake} />
                </div>
                <SudokuGrid
                  cells={cells}
                  setCells={setCells}
                  selectedCell={selectedCell}
                  setSelectedCell={setSelectedCell}
                  setSkorCount={setSkorCount}
                  setMistake={setMistake}
                />
                <GameInfo
                  level={difficulty}
                  playerName={playerName}
                  onLevelChange={handleLevelChange}
                />
                <NumberPad
                  handleNumberClick={(number) =>
                    handleNumberClick(
                      number,
                      selectedCell,
                      cells,
                      setCells,
                      setSkorCount,
                      setMistake
                    )
                  }
                />
              </div>
            ) : (
              <StartScreen onStart={handleStart} />
            )
          }
        />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/saved-games"
          element={
            <SavedGamesScreen
              onGameSelect={handleLoadSavedGameById}
              setCells={setCells}
              setDifficulty={setDifficulty}
              setSkorCount={setSkorCount}
              setMistake={setMistake}
              setGameStarted={setGameStarted}
            />
          }
        />
        <Route path="/login" element={<StartScreen onStart={handleStart} />} />
      </Routes>
    </div>
  );
}

export default App;
