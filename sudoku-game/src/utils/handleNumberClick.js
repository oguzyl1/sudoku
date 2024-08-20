/*sudoku grid içindeki numpadden giriş yapmayı sağlayan fonksiyon*/

import { sudokuControl } from "./SudokuControl.js";

export const handleNumberClick = (number, selectedCell, cells, setCells, setSkorCount) => {
  if (selectedCell !== null) {
    const newCells = [...cells];

    if (number === null || number === "") {
      newCells[selectedCell] = { ...newCells[selectedCell], value: "" };
      setCells(newCells);
    } else {
      if (
        !cells[selectedCell].locked &&
        sudokuControl(newCells, selectedCell, number.toString())
      ) {
        newCells[selectedCell] = { ...newCells[selectedCell], value: number };
        setCells(newCells);
        setSkorCount((prev) => prev + 5);
      } else {
        alert("Geçersiz Sayı Girdiniz!");
      }
    }
  }
};
