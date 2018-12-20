var fs = require("fs");

let input = fs
  .readFileSync("./testinput.txt", "utf8")
  .split("\n")
  .sort();

let regex = /\:(\d{2}).*?(?:(?<guard>\d+)|(?<wakes>wakes)|(?<falls>falls))/;
let guards = {};
let guardsMostSleep = {};
let guard = 0;
let startSleep = 0;
for (let line of input) {
  let match = regex.exec(line);
  if (match.groups.guard) {
    guard = parseInt(match.groups.guard);
    if (!guards[guard]) {
      guards[guard] = {};
    }
  }

  if (match.groups.falls) {
    startSleep = parseInt(match[1]);
  }

  if (match.groups.wakes) {
    for (let i = startSleep; i < parseInt(match[1]); i++) {
      guards[guard][i] = (guards[guard][i] || 0) + 1;
      guardsMostSleep[guard] = (guardsMostSleep[guard] || 0) + 1;
    }
  }
}

console.log(guardsMostSleep);
