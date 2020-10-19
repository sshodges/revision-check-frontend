function Node(data, name) {
  this.id = data;
  this.name = name;
  this.children = [];
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(id, parentId, name) {
    const node = new Node(id, name);
    // If the parentId arg is passed, find it. Otherwise, store null.
    const parent = parentId ? this.findBFS(parentId) : null;

    // Push new node to parent whose value matches toNodeData
    if (parent) {
      parent.children.push(node);
    } else {
      // If there's no parent, make this the root node
      if (!this.root) this.root = node;
      else return 'Tried to store node as root when root already exists.';
    }
  }

  findBFS(data) {
    let _node = null;

    // Go thru every node in BFS
    this.traverseBFS((node) => {
      // Return match if found
      if (node.id === data) {
        _node = node;
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];

    if (cb)
      while (queue.length) {
        // Store current node & remove it from queue
        const node = queue.shift();

        cb(node);

        // Push children of current node to end of queue
        for (const child of node.children) {
          queue.push(child);
        }
      }
  }
}

export default Tree;
