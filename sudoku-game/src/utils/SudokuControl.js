// utils/sudokuControl.js
export const sudokuControl = (cells, index, value) => {
  const row = Math.floor(index / 9);
  const col = index % 9;

  // Satırda kontrol et
  for (let i = 0; i < 9; i++) {
    const cellIndex = row * 9 + i;
    if (cells[cellIndex]?.value === value && cellIndex !== index) {
      return false;
    }
  }

  // Sütunda kontrol et
  for (let i = 0; i < 9; i++) {
    const cellIndex = col + i * 9;
    if (cells[cellIndex]?.value === value && cellIndex !== index) {
      return false;
    }
  }

  // 3x3 blokta kontrol et
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cellIndex = (startRow + i) * 9 + (startCol + j);
      if (cells[cellIndex]?.value === value && cellIndex !== index) {
        return false;
      }
    }
  }

  return true;
};
