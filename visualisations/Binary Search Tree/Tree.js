import { Node } from "./Node.js";

export class Tree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let node = this.root;
    while (true) {
      if (val === node.val) break;
      if (val > node.val) {
        if (node.right) {
          node = node.right;
          continue;
        }
        if (!node.right) {
          node.right = newNode;
          newNode.parent = node;
          newNode.pos = "right";
          break;
        }
        node = node.left;
      }

      if (val < node.val) {
        if (node.left) {
          node = node.left;
          continue;
        }
        if (!node.left) {
          node.left = newNode;
          newNode.parent = node;
          newNode.pos = "left";
          break;
        }
        node = node.right;
      }
    }
    return this;
  }

  setXYpos(size) {
    //Using breadth-first search
    this.root.offset = size / 2;
    const queue = [this.root];
    const values = [];
    while (queue.length) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (node === this.root) continue;
      if (node.pos === "left") {
        node.offset = node.parent.offset / 2;
        node.x = node.parent.x - node.offset;
        node.y = node.parent.y + 40;
      }
      if (node.pos === "right") {
        node.offset = node.parent.offset / 2;
        node.x = node.parent.x + node.offset;
        node.y = node.parent.y + 40;
      }

      console.log("node", node);
    }
  }

  flatten(node = this.root, arr = []) {
    arr.push(node);
    if (node.left) this.flatten(node.left, arr);
    if (node.right) this.flatten(node.right, arr);
    return arr;
  }
}
