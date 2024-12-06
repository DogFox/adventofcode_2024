
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const changeDirection = (currentDir) => {
    if (currentDir === 'up') return 'right';
    if (currentDir === 'right') return 'down';
    if (currentDir === 'down') return 'left';
    if (currentDir === 'left') return 'up';
}

const isLoop = (startX, startY, startDir, grid) => {
    const positions = new Set();
    let x = startX, y = startY, dir = startDir;

    const rows = grid.length;
    const cols = grid[0].length;

    const maxSteps = 10000;
    let steps = 0;

    const directions = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0]
    };

    while (true) {
        const state = `${x},${y},${dir}`;
        if (positions.has(state)) {
            return true;
        }
        positions.add(state);

        if (steps++ > maxSteps) {
            return true;
        }

        const [dx, dy] = directions[dir];
        const nextX = x + dx;
        const nextY = y + dy;

        if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
            return false;
        }

        if (grid[nextY][nextX] === '#' || grid[nextY][nextX] === 'O') {
            dir = changeDirection(dir);
        } else {
            x = nextX;
            y = nextY;
        }
    }
}

const move = (arr, guardPos) => {
    const m = arr.length
    const n = arr[0].length
    let inf = false

    let count = 0
    const startDir = 'up';
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i][j] != '#') {
                arr[i][j] = 'O'
                inf = isLoop(guardPos.x, guardPos.y, startDir, arr)
                if (inf) count++
                arr[i][j] = '.'
            }
        }
    }

    console.log(count);
}

check = (data) => {
    const arr = []
    const guardPos = { x: 0, y: 0 }
    data.toString().split("\n").map((el, index) => {
        if (el.indexOf("^") > 0) {//|| el.includes(">") || el.includes("<") || el.includes("v"))
            guardPos.x = el.indexOf("^")
            guardPos.y = index
        }
        arr.push(el.trim().split(""))
    });

    move(arr, guardPos)

    let result = 0
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }