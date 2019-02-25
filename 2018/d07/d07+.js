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

// console.log(graph);

// find root
let result = "";
let secondsPassed = 0;

solve(60, 6);


console.log(result);
console.log(secondsPassed);

function solve(offset = 0, workers = 1) {
  let canGo = [];

  while (!isFinished()) {
    // find all
    for (let letter in graph) {
      // letter already processed
      let node = graph[letter];

      if (result.indexOf(letter) > -1 || node.active) {
        continue;
      }

      if (
        canGo.length < workers &&
        node.previous.every(l => result.indexOf(l) > -1)
      ) {
        node.active = true;
        const timeTillDone = offset + letter.charCodeAt(0) - 64;
        let entry = { letter: letter, eta: timeTillDone };
        canGo.push(entry);
      }
    }

    // update timer
    secondsPassed++;

    if (canGo.length > 0) {
      // tick all jobs
      canGo = canGo.map(entry => ({ ...entry, eta: entry.eta - 1 }));
      // check for done
      result += canGo
        .filter(entry => entry.eta === 0)
        .map(entry => entry.letter)
        .sort()
        .join("");
      // empty done
      canGo = canGo.filter(entry => entry.eta !== 0);
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
