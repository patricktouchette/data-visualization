import { Node } from './Node.js';

export class Grid {
  constructor({ step, rows, cols, size }) {
    this.step = step;
    this.rows = rows;
    this.cols = cols;
    this.size = size;
    this.data = this.createGrid();
  }

  // Generate the Grid
  createGrid() {
    const data = [];
    for (let i = 0; i < this.cols; i += 1) {
      data.push([]);
      for (let j = 0; j < this.rows; j += 1) {
        const randomNum = Math.floor(Math.random() * 100);
        const color = randomNum < 20 ? 'steelblue' : 'white';
        data[i].push(new Node(i, j, color));
      }
    }
    return data;
  }

  getStartNode(targetColor) {
    const xLen = this.data.length;
    const yLen = this.data[0].length;
    const x = Math.floor(Math.random() * xLen);
    const y = Math.floor(Math.random() * yLen);
    const node = this.data[x][y];
    node.color = targetColor;
    return node;
  }
}
