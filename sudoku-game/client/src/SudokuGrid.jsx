import { handleChange } from "./utils/HandleChange.js";

function SudokuGrid({
  cells,
  setCells,
  selectedCell,
  setSelectedCell,
  setSkorCount,
  setMistake,
}) {
  const handleCellClick = (index) => {
    if (!cells[index].locked) {
      setSelectedCell(index);
    }
  };

  return (
    <div className="sudoku-grid">
      {cells.map((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        return (
          <input
            className={`sudoku-grid-cell ${cell.locked ? "locked" : ""}`}
            key={index}
            type="text"
            value={cell.value}
            onClick={() => handleCellClick(index)}
            onChange={(e) =>
              handleChange(
                cells,
                index,
                e.target.value,
                setCells,
                setSkorCount,
                setMistake
              )
            }
            maxLength="1"
            style={{
              marginBottom: row % 3 === 2 && row !== 8 ? "15px" : "0",
              marginRight: col % 3 === 2 && col !== 8 ? "15px" : "0",
            }}
          />
        );
      })}
    </div>
  );
}

export default SudokuGrid;
