
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")
const directions = {
    "<": [-1, 0],
    ">": [1, 0],
    "^": [0, -1],
    "v": [0, 1],
}
function wider(grid) {
    let newMap = []
    for (let row of grid) {
        let newRow = []
        for (let tile of row.split('')) {
            switch (tile) {
                case '#':
                    newRow.push('##')
                    break
                case 'O':
                    newRow.push('[]')
                    break
                case '.':
                    newRow.push('..')
                    break
                case '@':
                    newRow.push('@.')
                    break
                default:
                    newRow.push(tile)
                    break
            }
        }

        newMap.push(newRow.join('').split(''))
    }
    return newMap
}

function gps(grid) {
    let sum = 0
    const rows = grid.length
    const cols = grid[0].length
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const el = grid[i][j]
            if (el === '[') {
                sum += (i * 100) + j
            }
        }
    }
}
function print(grid, writeStream = null) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''))
        if (writeStream)
            writeStream.write(grid[i].join('') + '\n')
    }
    console.log('\n')
    if (writeStream)
        writeStream.write('\n')
}

function move(grid, x, y, x2, y2, dx, dy) {
    const el = grid[y][x]
    const el2 = y2 && grid[y2][x2]
    const nextX = x + dx
    const nextY = y + dy
    const nextX2 = x2 + dx
    const nextY2 = y2 + dy
    if (grid[nextY][nextX] === '#' || (y2 && grid[nextY2][nextX2] === '#')) {
        return [x, y]
    }
    if (grid[nextY][nextX] === '[' || grid[nextY][nextX] === ']' || (y2 && grid[nextY2][nextX2] === '[' || y2 && grid[nextY2][nextX2] === ']')) {
        if (dy === 0) {
            move(grid, nextX, nextY, null, null, dx, dy)
        } else {
            if (grid[nextY][nextX] === '[' || grid[nextY][nextX] === ']') {
                const newX2 = grid[nextY][nextX] === '[' ? nextX + 1 : nextX - 1
                move(grid, nextX, nextY, newX2, nextY, dx, dy)
            } else {
                const newX2 = grid[nextY2][nextX2] === '[' ? nextX2 + 1 : nextX2 - 1
                move(grid, nextX2, nextY2, newX2, nextY2, dx, dy)
            }
        }
    }
    if (grid[nextY][nextX] === '.') {
        if (y2) {
            if (grid[nextY2][nextX2] === '.') {
                grid[nextY2][nextX2] = el2
                grid[y2][x2] = '.'
                y2 = nextX2
                x2 = nextY2
            } else {
                return [x, y]
            }
        }
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

    const writeStream = fs.createWriteStream("output.txt", { flags: 'a' })

    // writeStream.write('start' + '\n')
    print(grid, writeStream)

    let index = 0
    for (const char of movements) {
        index++
        const [dx, dy] = directions[char]
        const res = move(grid, x, y, null, null, dx, dy)
        x = res[0]
        y = res[1]
        // writeStream.write(`move ${index} - ${char} \n`)
        print(grid, writeStream)
    }
    print(grid, writeStream)

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
        if (el[0] === "#") grid.push(el.trim())
        // if (el[0] === "#") grid.push(el.trim().split(''))
        if (el[0] !== "#" && el !== "") movements += el.trim()
    })
    const newGrid = wider(grid)
    // const newGrid = grid
    newGrid.forEach((row, index) => {
        const found = row.indexOf('@')
        if (found > 0) {
            robot.x = found
            robot.y = index
        }
    })

    console.log(robot);

    warehouse(newGrid, movements, robot)
    gps(newGrid)
    return ''
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }