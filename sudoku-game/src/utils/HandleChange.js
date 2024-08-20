// utils/HandleChange.js

import { sudokuControl } from "./SudokuControl.js";

export const handleChange = (cells, index, value, setCells, setSkorCount) => {
  const newValue = value.match(/[1-9]/) ? value : "";
  const newCells = [...cells];
  const oldValue = cells[index].value;

  if (sudokuControl(newCells, index, newValue)) {
    if (newValue !== oldValue) {
      const oldScore = oldValue ? 5 : 0;
      const newScore = newValue ? 5 : 0;
      setSkorCount((prev) => prev + newScore - oldScore);
    }
    newCells[index] = { ...newCells[index], value: newValue };
  } else {
    newCells[index] = { ...newCells[index], value: "" };
    alert("Geçersiz sayı!");
  }

  setCells(newCells);
};
