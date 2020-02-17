// Flood Fill
export function floodFill({
  grid,
  render,
  targetColor,
  replacementColor,
  type,
}) {
  const startNode = grid.getStartNode(targetColor);
  const queue = [startNode];
  let timer = grid.step;
  while (queue.length) {
    let node;
    if (type === 'line') {
      node = queue.pop();
    } else {
      node = queue.shift();
    }
    if (node.visited) continue;
    if (node.color === replacementColor) continue;
    if (node.color !== targetColor) continue;
    node.visited = true;
    setTimeout(() => fill({ node, render, replacementColor }), timer);
    timer += grid.step;

    // bottom
    if (node.y + 1 < grid.data[0].length) {
      queue.push(grid.data[node.x][node.y + 1]);
    }
    // top
    if (node.y - 1 >= 0) {
      queue.push(grid.data[node.x][node.y - 1]);
    }
    // right
    if (node.x + 1 < grid.data.length) {
      queue.push(grid.data[node.x + 1][node.y]);
    }
    // left
    if (node.x - 1 >= 0) {
      queue.push(grid.data[node.x - 1][node.y]);
    }
  }
}

function fill({ node, render, replacementColor }) {
  node.color = replacementColor;
  render();
}
