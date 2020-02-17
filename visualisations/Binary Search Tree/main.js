import { Tree } from './Tree.js';
import { binaryTree } from './d3BinaryTree.js';

const tree = new Tree();
console.log('tree', tree);
for (let i = 0; i < 25; i++) {
  tree.insert(Math.floor(Math.random() * 100));
}

tree
  .insert(3)
  .insert(2)
  .insert(5)
  .insert(10)
  .insert(20)
  .insert(4)
  .insert(6)
  .insert(1);
tree.setXYpos(1000);

const svg = d3
  .select('#vis')
  .append('svg')
  .attr('width', 1200)
  .attr('height', 600);

const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const mainG = svg
  .append('g')
  .attr('transform', `translate(${margin.top}, ${margin.left})`);

console.log('tree.flatten()', tree.flatten());
binaryTree(mainG, { data: tree.flatten(), offset: 500 });
