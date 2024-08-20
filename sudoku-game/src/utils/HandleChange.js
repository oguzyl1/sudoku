/*sudoku grid içindeki klavyeden giriş yapmayı sağlayan fonksiyon*/
// utils/HandleChange.js

import { sudokuControl } from "./SudokuControl.js";


export const handleChange = (cells, index, value, setCells, setSkorCount) => {
  const newValue = value.match(/[1-9]/) ? value : "";
  const newCells = [...cells];
  if (sudokuControl(newCells, index, newValue)) {
    newCells[index] = { ...newCells[index], value: newValue };
    setSkorCount((prev) => prev+5);
  } else {
    newCells[index] = { ...newCells[index], value: "" };
    alert("Geçersiz sayı!");
  }

  setCells(newCells);
};
