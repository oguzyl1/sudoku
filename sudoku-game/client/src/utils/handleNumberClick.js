// utils/HandleNumberClick.js

import { sudokuControl } from "./SudokuControl.js";

export const handleNumberClick = (
  number,
  selectedCell,
  cells,
  setCells,
  setSkorCount,
  setMistake
) => {
  if (selectedCell !== null) {
    const newCells = [...cells];
    const oldValue = newCells[selectedCell].value;

    if (number === null || number === "") {
      newCells[selectedCell] = { ...newCells[selectedCell], value: "" };
      const oldScore = oldValue ? 5 : 0;
      setSkorCount((prev) => Number(prev) - oldScore);
    } else {
      if (
        !cells[selectedCell].locked &&
        sudokuControl(newCells, selectedCell, number.toString())
      ) {
        const oldScore = oldValue ? 5 : 0;
        const newScore = number ? 5 : 0;
        setSkorCount((prev) => Number(prev) + newScore - oldScore);
        newCells[selectedCell] = {
          ...newCells[selectedCell],
          value: number.toString(),
        };
      } else {
        setMistake((prev) => Math.max(prev - 1, 0));
      }
    }

    setCells(newCells);
  }
};
