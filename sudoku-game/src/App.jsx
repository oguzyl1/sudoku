import { useState, useCallback, useEffect } from "react";
import NavBar from "./NavBar.jsx";
import SudokuGrid from "./SudokuGrid.jsx";
import GameInfo from "./GameInfo.jsx";
import NumberPad from "./NumberPad.jsx";
import { initializeCells } from "./utils/initializeCells.js";
import { handleNumberClick } from "./utils/HandleNumberClick.js";
import StartScreen from "./StartScreen.jsx";
import SkorBoard from "./SkorBoard.jsx";

function App() {
  const [cells, setCells] = useState(Array(81).fill({ value: "", locked: false }));
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState("Kolay");
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [skorCount, setSkorCount] = useState(0);

  // Başlangıç ekranı
  const handleStart = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  // Zorluk seviyesini değiştirme işlevi
  const handleLevelChange = (newLevel) => {
    setDifficulty(newLevel);
  };

  // Hücreleri zorluk seviyesine göre başlat
  useEffect(() => {
    let numOfCellsToFill;

    if (difficulty === "Kolay") {
      numOfCellsToFill = 30;
    } else if (difficulty === "Orta") {
      numOfCellsToFill = 20;
    } else if (difficulty === "Zor") {
      numOfCellsToFill = 10;
    }

    initializeCells(numOfCellsToFill, setCells);
  }, [difficulty]);

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="screen">
          {gameStarted ? (
            <div className="game-screen">
              <SkorBoard skorCount={skorCount} />
              <SudokuGrid
                cells={cells}
                setCells={setCells}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                setSkorCount={setSkorCount}
              />
              <GameInfo level={difficulty} playerName={playerName} onLevelChange={handleLevelChange} />
              <NumberPad handleNumberClick={(number) => handleNumberClick(number, selectedCell, cells, setCells, setSkorCount)} />
            </div>
          ) : (
            <StartScreen onStart={handleStart} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
