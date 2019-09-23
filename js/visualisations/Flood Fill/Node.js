export class Node {
  constructor(x, y, color = 'white') {
    this.x = x;
    this.y = y;
    this.id = `${x}-${y}`;
    this.color = color;
    this.visited = false;
  }
}
