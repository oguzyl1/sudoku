// utils/HandleNumberClick.js

import { sudokuControl } from "./SudokuControl.js";

export const handleNumberClick = (
  number,
  selectedCell,
  cells,
  setCells,
  setSkorCount
) => {
  if (selectedCell !== null) {
    const newCells = [...cells];
    const oldValue = newCells[selectedCell].value;

    if (number === null || number === "") {
      newCells[selectedCell] = { ...newCells[selectedCell], value: "" };
      const oldScore = oldValue ? 5 : 0;
      setSkorCount((prev) => prev - oldScore);
    } else {
      if (
        !cells[selectedCell].locked &&
        sudokuControl(newCells, selectedCell, number.toString())
      ) {
        const oldScore = oldValue ? 5 : 0;
        const newScore = number ? 5 : 0;
        setSkorCount((prev) => prev + newScore - oldScore);
        newCells[selectedCell] = {
          ...newCells[selectedCell],
          value: number.toString(),
        };
      } else {
        alert("Geçersiz Sayı Girdiniz!");
      }
    }

    setCells(newCells);
  }
};
