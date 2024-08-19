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


  //blok kontrolleri için
  const sudokuControl = ((cells,index,value)=>{
    const row = Math.floor(index/9);
    const col = index % 9;

    //9*9 üzerinde satır ve sütun kontrolü
    for(let i =0;i<9;i++){
      const cellIndex = (row * 9) + i; // örneğin seçtğimiz kutu 1. satırda 1*9 + 0 , 1*9+1 ... diye gidip o satırı dolaşacak
      if(cells[cellIndex]?.value === value && cellIndex !== index ){
        return false;
    }
  }

    for(let i=0;i<9;i++){
      const cellIndex = col + (i*9);
      if(cells[cellIndex]?.value === value && cellIndex !== index){
        return false;
      }
    }

    //3*3 bloklarda kontrol için
    const littleRow = Math.floor(row/3)*3;
    const littleCol = Math.floor(col/3)*3;

    for(let i = 0 ; i<3 ;i ++){
      for(let j = 0 ; j<3 ; j++){
        const cellIndex = (littleRow+i) * 9 +(littleCol +j);
        if(cells[cellIndex]?.value === value && cellIndex !== index){
          return false;
        }
      }
    }

    //yukarıdaki olumsuz şartların hiçbiri olmazsa true dönecek yani sayı oraya yerleştirilebilir
    return true;

  });

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
      if (!filledIndexes.has(randomIndex) && sudokuControl(newCells,randomIndex,randomValue.toString())) {
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
