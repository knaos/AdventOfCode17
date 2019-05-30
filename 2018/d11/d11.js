const gridSerialNumber = 7139;

let cells = new Map();
// fill field

for (let y = 1; y <= 300; y++) {
  for (let x = 1; x <= 300; x++) {
    let power = findPower(x, y, gridSerialNumber);
    let top = cells.get(`${x}:${y - 1}`) || 0;
    let left = cells.get(`${x - 1}:${y}`) || 0;
    let topLeft = cells.get(`${x - 1}:${y - 1}`) || 0;
    cells.set(`${x}:${y}`, power + top + left - topLeft);
  }
}

// walk field

let maxSum = Number.MIN_SAFE_INTEGER;
let winnerCords = ``;
let goodSize;

for (let size = 1; size <= 300; size++) {
  for (let y = size; y <= 300 ; y++) {
    for (let x = size; x <= 300; x++) {
      let localSum = 0;
      let top = cells.get(`${x}:${y - size}`) || 0;
      let left = cells.get(`${x - size}:${y}`) || 0;
      let topLeft = cells.get(`${x - size}:${y - size}`) || 0;
      let current = cells.get(`${x}:${y}`);
      localSum = current - top - left + topLeft;
      if (localSum > maxSum) {
        maxSum = localSum;
        goodSize = size;
        winnerCords = `${x - goodSize + 1}:${y - goodSize + 1}`;
      }
    }
  }
}
console.log(winnerCords);
console.log(maxSum);
console.log(goodSize);

function findPower(x, y, gridSerialNumber = gridSerialNumber) {
  let power;
  let rackId = x + 10;
  power = rackId * y;
  power += gridSerialNumber;
  power = power * rackId;
  power = parseInt(Array.from(Math.floor(power / 100).toString()).pop());
  power -= 5;
  return power;
}

// console.log(findPower(3,5, 8));
// console.log(findPower(122,79, 57));
// console.log(findPower(1217,196, 39));
