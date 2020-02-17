function node(x, y) {
  const value = Math.round(Math.random() * 100);
  return { x, y, value };
}

export function createGrid(rows, columns) {
  const grid = [];
  for (let x = 0; x < rows; x += 1) {
    for (let y = 0; y < columns; y += 1) {
      grid.push(node(x, y));
    }
  }
  return grid;
}
