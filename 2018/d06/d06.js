var fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map(i => i.split(", ").map(n => parseInt(n)))
  .map(record => ({ x: record[0], y: record[1] }));

let maxX = 0;
let maxY = 0;

for (let point of input) {
  if (point.x > maxX) {
    maxX = point.x;
  }
  if (point.y > maxY) {
    maxY = point.y;
  }
}
let count = 0;
let area = {};
let infinite = {};
// build matrix
for (let row = 0; row <= maxY; row++) {
  for (let col = 0; col <= maxX; col++) {
    let min = Number.MAX_SAFE_INTEGER;
    let point = null;
    let total = 0;

    for (let record of input) {
      let distance = Math.abs(record.x - col) + Math.abs(record.y - row);
      total += distance;
      if (distance < min) {
        min = distance;
        point = `${record.x}-${record.y}`;
      } else if (distance === min) {
        point = ".";
      }
    }

    if (total < 10000) {
      count++;
    }

    if (point == ".") {
      continue;
    }
    area[point] = (area[point] || 0) + 1;
    if (row == 0 || row == maxY || col == 0 || col == maxX) {
      infinite[point] = true;
    }
  }
}

console.log(
  Object.entries(area)
    .filter(a => !infinite[a[0]])
    .map(a => a[1])
    .sort((a, b) => b - a)[0]
);

console.log(count);
