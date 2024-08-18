import { useState, useCallback, useEffect } from "react";
import NavBar from "./NavBar.jsx";
import SudokuGrid from "./SudokuGrid.jsx";
import GameInfo from "./GameInfo.jsx";
import NumberPad from "./NumberPad.jsx";

function App() {
  const [cells, setCells] = useState(Array(81).fill({ value: "", locked: false }));
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState("Kolay");

  // Number Pad'den sayı girmek için
  const handleNumberClick = (number) => {
    if (selectedCell !== null && !cells[selectedCell].locked) {
      const newCells = [...cells];
      newCells[selectedCell] = { ...newCells[selectedCell], value: number };
      setCells(newCells);
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
      
      if (!filledIndexes.has(randomIndex)) {
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
          <div className="game-screen">
            <SudokuGrid
              cells={cells}
              setCells={setCells}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              difficulty={difficulty}
            />
            <GameInfo level={difficulty} onLevelChange={handleLevelChange} />
            <NumberPad handleNumberClick={handleNumberClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
