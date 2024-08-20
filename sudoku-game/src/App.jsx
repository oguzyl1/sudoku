import { useState, useCallback, useEffect } from "react";
import NavBar from "./NavBar.jsx";
import SudokuGrid from "./SudokuGrid.jsx";
import GameInfo from "./GameInfo.jsx";
import NumberPad from "./NumberPad.jsx";
import { sudokuControl } from "./utils/SudokuControl.js";
import StartScreen from "./StartScreen.jsx";

function App() {


  const [cells, setCells] = useState(Array(81).fill({ value: "", locked: false }));
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState("Kolay");
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  //başlangıç ekranı
  const handleStart = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };


  // Number Pad'den sayı girmek için
  const handleNumberClick = (number) => {
    if (selectedCell !== null) {
      const newCells = [...cells];

      if (number === null || number === "") {
        newCells[selectedCell] = { ...newCells[selectedCell], value: "" };
        setCells(newCells);
      } else {
        if (
          !cells[selectedCell].locked &&
          sudokuControl(newCells, selectedCell, number)
        ) {
          newCells[selectedCell] = { ...newCells[selectedCell], value: number };
          setCells(newCells);
        } else {
          alert("Geçersiz Sayı Girdiniz!");
        }
      }
    }
  };


  // Zorluk seviyesini değiştirme işlevi
  const handleLevelChange = (newLevel) => {
    setDifficulty(newLevel);
  };

  
  // Hücreleri zorluk seviyesine göre başlat
  const initializeCells = useCallback((numOfCellsToFill) => {
    const newCells = Array(81).fill({ value: "", locked: false });
    const filledIndexes = new Set();

    while (filledIndexes.size < numOfCellsToFill) {
      const randomIndex = Math.floor(Math.random() * 81);
      const randomValue = Math.floor(Math.random() * 9) + 1;

      //rastgele seçilen satırların kontrolü
      if (
        !filledIndexes.has(randomIndex) &&
        sudokuControl(newCells, randomIndex, randomValue.toString())
      ) {
        newCells[randomIndex] = { value: randomValue.toString(), locked: true };
        filledIndexes.add(randomIndex);
      }
    }

    setCells(newCells);
  }, []);

  // Zorluk değiştiğinde hücreleri başlat
  useEffect(() => {
    let numOfCellsToFill;

    if (difficulty === "Kolay") {
      numOfCellsToFill = 30;
    } else if (difficulty === "Orta") {
      numOfCellsToFill = 20;
    } else if (difficulty === "Zor") {
      numOfCellsToFill = 10;
    }

    initializeCells(numOfCellsToFill);
  }, [difficulty, initializeCells]);

  return (
  <>
    <NavBar />
    <div className="main">
      <div className="screen">
        {gameStarted ? (
          <div className="game-screen">
            <SudokuGrid
              cells={cells}
              setCells={setCells}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              difficulty={difficulty}
            />
            <GameInfo level={difficulty} playerName={playerName} onLevelChange={handleLevelChange} />
            <NumberPad handleNumberClick={handleNumberClick} />
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
