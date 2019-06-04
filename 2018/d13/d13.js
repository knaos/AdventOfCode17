var fs = require("fs");
let input = fs.readFileSync("./input.txt", "utf8").split("\n");
for (let line in input) {
  input[line] = input[line].split("");
}
let maxX = input[0].length;
let maxY = input.length;

// get carts
let carts = {};
for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
    let char = input[y][x];

    if (char == "<" || char == ">" || char == "^" || char == "v") {
      let c = {
        x,
        y,
        turnsCount: 0,
        direction: char,
        lastIteration: -1
      };

      carts[`${x}:${y}`] = c;
      input[y][x] = char == "<" || char == ">" ? "-" : "|";
    }
  }
}

let iteration = 1;
while (true) {
  tick(iteration);
  iteration++;
  if(Object.keys(carts).length === 1) {
    break;
  }
  // printField();
}

console.log(carts);

function tick(iteration) {
  let newCarts = {};
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      let cart = carts[`${x}:${y}`];
      if (cart) {
        if(cart.lastIteration == iteration) {
          continue;
        }
        cart = {...cart};
        cart.lastIteration = iteration;
        // move
        switch (cart.direction) {
          case ">":
            cart.x++;
            break;
          case "<":
            cart.x--;
            break;
          case "^":
            cart.y--;
            break;
          case "v":
            cart.y++;
            break;
          default:
            break;
        }
      } else {
        continue;
      }

      // has collision
      delete carts[`${x}:${y}`];
      if (carts[`${cart.x}:${cart.y}`]) {
        // delete current
        delete carts[`${cart.x}:${cart.y}`];
        // throw new Error(`Collision at: ${cart.x}:${cart.y}`);
        continue;
      }
      carts[`${cart.x}:${cart.y}`] = cart;
      
      switch (input[cart.y][cart.x]) {
        case `\\`:
          if (cart.direction == ">") {
            cart.direction = "v";
          } else if (cart.direction == "^") {
            cart.direction = "<";
          } else if (cart.direction == "v") {
            cart.direction = ">";
          } else if (cart.direction == "<") {
            cart.direction = "^";
          }
          break;
        case `/`:
          if (cart.direction == ">") {
            cart.direction = "^";
          } else if (cart.direction == "^") {
            cart.direction = ">";
          } else if (cart.direction == "v") {
            cart.direction = "<";
          } else {
            cart.direction = "v";
          }
          break;
        case "+":
          cart.turnsCount++;
          switch (cart.turnsCount % 3) {
            case 1:
              if (cart.direction == "<") {
                cart.direction = "v";
              } else if (cart.direction == "v") {
                cart.direction = ">";
              } else if (cart.direction == ">") {
                cart.direction = "^";
              } else if (cart.direction == "^") {
                cart.direction = "<";
              }
              break;
            case 2:
              break;
            case 0:
              // turn right
              if (cart.direction == "<") {
                cart.direction = "^";
              } else if (cart.direction == "v") {
                cart.direction = "<";
              } else if (cart.direction == ">") {
                cart.direction = "v";
              } else if (cart.direction == "^") {
                cart.direction = ">";
              }
              break;
            default:
              break;
          }
        default:
          break;
      }
    }
  }
}

function printField() {
  for (let row in input) {
    let line = "";
    for (let col in input[row]) {
      if (carts[`${col}:${row}`]) {
        line += carts[`${col}:${row}`].direction;
      } else {
        line += input[row][col];
      }
    }
    console.log(line);
  }
}
