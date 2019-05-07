class Node {
  constructor(data) {
    this.previous = null;
    this.next = null;
    this.data = data;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(data) {
    let node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
  }

  pop() {
    let node = this.tail;
    this.tail.previous.next = null;
    this.tail = this.tail.previous;
    return node.data;
  }

  shift() {
    const node = this.head;
    if (node.next) {
      node.next.previous = null;
    }

    this.head = this.head.next;
    return node.data;
  }

  unshift(data) {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
  }
}

let field = new DoublyLinkedList();
let highscore = {};

field.push(1);
field.push(0);

const marbleCount = 71510 * 100;
const playerCount = 447;
let currentPlayer = 1;
for (let marble = 2; marble <= marbleCount; marble++) {
  currentPlayer = (currentPlayer % playerCount) + 1;

  if (marble % 23 === 0) {
    highscore[currentPlayer] = marble + (highscore[currentPlayer] || 0);
    for (let i = 0; i < 7; i++) {
      field.unshift(field.pop());
    }

    highscore[currentPlayer] += field.shift();
  } else {
    // rotate twice anti-clockwise
    field.push(field.shift());
    field.push(field.shift());

    field.unshift(marble);
  }
}

let result = [];
for (let player in highscore) {
  // console.log(player);
  result.push(parseInt(highscore[player]));
}

console.log(Math.max(...result));
// printField(field);
function printField(field) {
  let item = field.head;
  while (item) {
    console.log(item.data);
    item = item.next;
  }
}
