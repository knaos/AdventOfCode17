var fs = require("fs");

let input = fs
  .readFileSync("./input.txt", "utf8")
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

// First part

// let sleepyGuardId = null;
// for (let guard of Object.entries(guardsMostSleep)) {
//   let id = guard[0];
//   let time = guard[1];

//   if (!sleepyGuardId || guardsMostSleep[sleepyGuardId] < time) {
//     sleepyGuardId = id;
//   }
// }

// let maxTime = 0;
// let mostSleepyMinute = null;
// for (let record of Object.entries(guards[sleepyGuardId])) {
//   let minute = record[0];
//   let time = record[1];
//   if (time > maxTime) {
//     maxTime = time;
//     mostSleepyMinute = minute;
//   }
// }

// console.log(parseInt(sleepyGuardId) * parseInt(mostSleepyMinute));

// Second part
let mostSleepPerMinuteGuardId, mostSleptMinute;
let maxSleepPerMinute = 0;

for (let guard of Object.entries(guards)) {
  let guardId = guard[0];

  for (let record of Object.entries(guards[guardId])) {
    let minute = record[0];
    let timeSlept = record[1];
    if (timeSlept > maxSleepPerMinute) {
      mostSleepPerMinuteGuardId = guardId;
      mostSleptMinute = minute;
      maxSleepPerMinute = timeSlept;
    }
  }
}

console.log(parseInt(mostSleepPerMinuteGuardId) * parseInt(mostSleptMinute));
