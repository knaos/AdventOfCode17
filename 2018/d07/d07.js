const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf8").split("\n");

const regex = /Step (\w).*?step (\w)/;

let graph = {};
let chart = {};
for (let command of input) {
  const [match, firstStep, secondStep] = command.match(regex);

  if (!graph[firstStep]) {
    graph[firstStep] = {};
    graph[firstStep].previous = [];
    graph[firstStep].next = [];
  }

  if (!graph[secondStep]) {
    graph[secondStep] = {};
    graph[secondStep].previous = [];
    graph[secondStep].next = [];
  }

  graph[firstStep].next.push(secondStep);
  graph[secondStep].previous.push(firstStep);
  chart[firstStep] = chart[firstStep] || 0;
  chart[secondStep] = (chart[secondStep] || 0) + 1;
}

console.log(graph);

// find root
let result = "";

// while (true) {
//   for (let n in graph) {
//     traceGraph(n);
//     if (graph[n].next.length === 0 && result.indexOf(n) > -1) {
//       console.log(result);
//       return;
//     }
//   }
// }

solve();

console.log(result);

function traceGraph(letter) {
  let previous = graph[letter].previous.sort();
  for (let previousStep of previous) {
    if (result.indexOf(previousStep) === -1) {
      //   console.log("bad", previousStep);
      return;
    }
  }

  if (result.indexOf(letter) == -1) {
    result += letter;
    console.log("added", letter);
  }

  let next = graph[letter].next.sort();

  for (let nextStep of next) {
    traceGraph(nextStep);
  }
}

function solve() {
  while (!isFinished()) {
    let canGo = [];
    for (let letter in graph) {
      if (result.indexOf(letter) > -1) {
        continue;
      }

      let node = graph[letter];
      if (node.previous.every(l => result.indexOf(l) > -1)) {
        canGo.push(letter);
      }
    }
    if (canGo.length > 0) {
        result += canGo.sort()[0];
    }
  }
}

function isFinished() {
  for (let letter in graph) {
    if (result.indexOf(letter) === -1) {
      return false;
    }
  }

  return true;
}
