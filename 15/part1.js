
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")
const directions = {
    "<": [-1, 0],
    ">": [1, 0],
    "^": [0, -1],
    "v": [0, 1],
}
function gps(grid) {
    let sum = 0
    const rows = grid.length
    const cols = grid[0].length
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const el = grid[i][j]
            if (el === 'O') {
                sum += (i * 100) + j
            }
        }
    }
    console.log(sum);
}
function print(grid) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''))
    }
    console.log('\n')
}
function move(grid, x, y, dx, dy) {
    const el = grid[y][x]
    const nextX = x + dx
    const nextY = y + dy
    if (grid[nextY][nextX] === '#') {
        return [x, y]
    }
    if (grid[nextY][nextX] === 'O') {
        move(grid, nextX, nextY, dx, dy)
    }
    if (grid[nextY][nextX] === '.') {
        grid[nextY][nextX] = el
        grid[y][x] = '.'
        x = nextX
        y = nextY
    }
    return [x, y]
}

function warehouse(grid, movements, robot) {
    let x = robot.x
    let y = robot.y
    for (const char of movements) {
        const [dx, dy] = directions[char]
        const res = move(grid, x, y, dx, dy)
        x = res[0]
        y = res[1]
        // print(grid)
    }
}

check = (data) => {
    const grid = []
    let movements = ''
    let robot = { x: -1, y: -1 }
    data.toString().split("\n").forEach((el, index) => {
        if (el.indexOf('@') > 0) {
            robot.x = el.indexOf('@')
            robot.y = index
        }
        if (el[0] === "#") grid.push(el.trim().split(''))
        if (el[0] !== "#" && el !== "") movements += el.trim()
    })
    warehouse(grid, movements, robot)
    gps(grid)

    print(grid);
    // console.log(movements);
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }