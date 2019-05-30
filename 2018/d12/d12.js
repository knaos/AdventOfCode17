var fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf8").split("\n");

const initialState = `#..#####.#.#.##....####..##.#.#.##.##.#####..####.#.##.....#..#.#.#...###..#..###.##.#..##.#.#.....#`;

// parseState

let state = initialState.split("").reduce((prev, curr, index) => {
  prev[index] = curr === "#" ? true : false;
  return prev;
}, {});

let rules = [];

for (let rule of input) {
  let [pattern, result] = rule.split(" => ");
  if(result !== "#") continue; 
  let patternParsed = pattern.split("").map(val => val === "#");
  patternParsed.push(result === "#");

  rules.push(patternParsed);
}

// console.log(state);
// console.log(rules);

let minIndex = 0;
let maxIndex = initialState.length;

for (let i = 1; i <= 1000; i++) {
  
  let newState = {};
  for (let j = minIndex - 3; j <= maxIndex + 3; j++) {
    let prevPrev = !!state[j - 2];
    let prev = !!state[j - 1];
    let curr = !!state[j];
    let next = !!state[j + 1];
    let nextNext = !!state[j + 2];

    let window = [prevPrev, prev, curr, next, nextNext];
    for (let rule of rules) {
      if (window.join("") === rule.slice(0, -1).join("")) {
        newState[j] = rule.slice(-1);
        if (j < minIndex) {
          minIndex = j;
        }
        if (j > maxIndex) {
          maxIndex = j;
        }
        break;
      }
    }
  }
  
  state = newState;
  if(i % 100 === 0)console.log(
    Object.keys(state).reduce((sum, value) => parseInt(sum) + parseInt(value))
  );
  
}

console.log(
  Object.keys(state).reduce((sum, value) => parseInt(sum) + parseInt(value))
);
