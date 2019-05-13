var fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf8").split("\n");
let regex = /=<\s*([-\d]+),\s*([\-\d]+).*?=<\s*([\-\d]+),\s*([\-\d]+)/;
let points = [];
let seconds = 0;

let field = {};
let minX, maxX, minY, maxY;

for (let line of input) {
  let [match, x, y, vX, vY] = regex.exec(line);
  let point = {
    x: parseInt(x),
    y: parseInt(y),
    vX: parseInt(vX),
    vY: parseInt(vY)
  };
  points.push(point);
}

while (true) {
  tick();
  minX = Number.MAX_SAFE_INTEGER;
  minY = Number.MAX_SAFE_INTEGER;
  maxX = Number.MIN_SAFE_INTEGER;
  maxY = Number.MIN_SAFE_INTEGER;

  for (let point of points) {
    minX = point.x < minX ? point.x : minX;
    minY = point.y < minY ? point.y : minY;

    maxX = point.x > maxX ? point.x : maxX;
    maxY = point.y > maxY ? point.y : maxY;
  }

  if (maxY - minY < 10) {
    // probably text is found
    // populate field
    field = {};
    for (let point of points) {
      field[`${point.x}:${point.y}`] = true;
    }

    console.log(">>>>>>>>>>>>>>" + seconds);
    for (let y = minY; y <= maxY; y++) {
      let line = "";
      for (let x = minX; x <= maxX; x++) {
        if (field[`${x}:${y}`]) {
          line += "#";
        } else {
          line += ".";
        }
      }
      console.log(line);
    }
  }

  if(seconds % 100 === 0) {
    //   console.log(seconds);
  }
}

function tick() {
  seconds++;
  points = points.map(p => {
    p.x = p.x + p.vX;
    p.y = p.y + p.vY;
    return p;
  });
}
