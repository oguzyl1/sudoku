import { useState } from "react";

function SudokuGrid({ cells, setCells, selectedCell, setSelectedCell }) {

  // Klavyeden sayı girmek için
  const handleChange = (index, value) => {
    const newValue = value.match(/[1-9]/) ? value : "";
    const newCells = [...cells];
    newCells[index] = { ...newCells[index], value: newValue };
    setCells(newCells);
  };

  // Hücreye tıkladığımızda seçili olan hücreyi güncellemek için
  const handleCellClick = (index) => {
    if (!cells[index].locked) {
      setSelectedCell(index);
    }
  }

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
            onChange={(e) => handleChange(index, e.target.value)}
            maxLength="1"
            style={{
              marginBottom: row % 3 === 2 ? '15px' : '0',
              marginRight: col % 3 === 2 ? '15px' : '0',
            }}
          />
        );
      })}
    </div>
  );
}

export default SudokuGrid;
