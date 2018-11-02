const fs = require('fs');
const assert = require('assert');

let input = `{{<ab>},{<ab>},{<ab>},{<ab>}}`.split('');
let realInput = fs.readFileSync('./input.text').toString().split('');

function cleanGarbage(input) {
    let isGarbage = false;
    let negateNext = false;
    let result = [];

    for (let char of input) {
        // If negated
        if (negateNext) {
            negateNext = false;

            // if (isGarbage) {
            //     continue;
            // }
            // result.push(char);
            continue;
        }
        // Start garbage
        if (char === '<' && !isGarbage) {
            isGarbage = true;
            continue;
        }

        // End garbage
        if (isGarbage && char === '>') {
            isGarbage = false;
            continue;
        }

        if (char === '!') {
            negateNext = true;
            continue;
        }

        if (isGarbage) {
            continue;
        }

        result.push(char);
    }

    return result;
}

function countNesting(input) {
    let openBrackets = 0;
    let points = 0;
    for (let char of input) {
        if (char === '{') {
            openBrackets++;
        }
        if (char === '}') {
            points += openBrackets;
            openBrackets--;
        }
    }
    return points;
}


const garbageTests = ['<>',
    '<random characters>',
    '<<<<>',
    '<{!>}>',
    '<!!>',
    '<!!!>>',
    '<{o"i!a']
for (let garbage of garbageTests) {
    assert(cleanGarbage(garbage.split('')).length === 0, 'Garbage is ifne');
}


assert(countNesting(cleanGarbage('{}')) == 1, 'Counting works')
assert(countNesting(cleanGarbage('{{{}}}')) == 6, 'Counting works')
assert(countNesting(cleanGarbage('{{},{}}')) == 5, 'Counting works')
assert(countNesting(cleanGarbage('{{{},{},{{}}}}')) == 16, 'Counting works')
assert(countNesting(cleanGarbage('{<a>,<a>,<a>,<a>}')) == 1, 'Counting works')
assert(countNesting(cleanGarbage('{{<ab>},{<ab>},{<ab>},{<ab>}}')) == 9, 'Counting works')
assert(countNesting(cleanGarbage('{{<!!>},{<!!>},{<!!>},{<!!>}}')) == 9, 'Counting works')
assert(countNesting(cleanGarbage('{{<a!>},{<a!>},{<a!>},{<ab>}}')) == 3, 'Counting works')

console.log(countNesting(cleanGarbage(realInput)));