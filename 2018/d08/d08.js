var fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf8").split(" ");

let sum = 0;
let index = 0;

let node = {
  childNodes: [],
  metaData: []
};

solve(node);

console.log(calculatePoints(node));

function solve(n) {
  index = index ? index + 1 : 0;
  const childNodes = Number(input[index]);
  index++;
  const metaData = Number(input[index]);

  for (let i = 0; i < childNodes; i++) {
    const node = {
      childNodes: [],
      metaData: []
    };
    n.childNodes.push(node);
    solve(node);
  }

  for (let i = 0; i < metaData; i++) {
    index++;
    n.metaData.push(Number(input[index]));
  }
}

function calculatePoints(node, sum) {
  if (node.childNodes.length === 0) {
    node.points = node.metaData.reduce((val, points) => val + points);

    return node;
  }

  for (let child of node.childNodes) {
    

    calculatePoints(child);

    
    // node.points += n.points;
  }

  if(!node.hasOwnProperty('points')) {
    node.points = 0;
  }

  for (let index of node.metaData) {
    if (node.childNodes[index - 1]) {
      node.points += node.childNodes[index - 1].points || 0;
    }
  }
  
  return node;
}

// console.log(sum);
