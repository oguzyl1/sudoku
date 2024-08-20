import { sudokuControl } from "./SudokuControl.js";

export const initializeCells = (numOfCellsToFill, setCells) => {
  const newCells = Array(81).fill({ value: "", locked: false });
  const filledIndexes = new Set();

  while (filledIndexes.size < numOfCellsToFill) {
    const randomIndex = Math.floor(Math.random() * 81);
    const randomValue = Math.floor(Math.random() * 9) + 1;

    // Rastgele seçilen hücrelerin kontrolü
    if (
      !filledIndexes.has(randomIndex) &&
      sudokuControl(newCells, randomIndex, randomValue.toString())
    ) {
      newCells[randomIndex] = { value: randomValue.toString(), locked: true };
      filledIndexes.add(randomIndex);
    }
  }

  setCells(newCells);
};
