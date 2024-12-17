
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")
const directions = {
    "<": [-1, 0],
    ">": [1, 0],
    "^": [0, -1],
    "v": [0, 1],
}
function wider(grid) {
    let newgrid = []
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

        newgrid.push(newRow.join('').split(''))
    }
    return newgrid
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
    console.log(sum);
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

function move(grid, moved, y, x, dy, dx) {
    if (grid[y + dy][x + dx] == "#") return false
    if (grid[y + dy][x + dx] == "O" || (dy == 0 && (grid[y + dy][x + dx] == "[" || grid[y + dy][x + dx] == "]"))) {
        if (!move(grid, moved, y + dy, x + dx, dy, dx)) return false
    } else if (grid[y + dy][x + dx] == "[") {
        if (!move(grid, moved, y + dy, x + dx, dy, dx)) return false
        if (!move(grid, moved, y + dy, x + 1, dy, dx)) return false
    } else if (grid[y + dy][x + dx] == "]") {
        if (!move(grid, moved, y + dy, x + dx, dy, dx)) return false
        if (!move(grid, moved, y + dy, x - 1, dy, dx)) return false
    }
    moved[[y + dy, x + dx]] = grid[y][x]
    if (!moved[[y, x]]) moved[[y, x]] = "."
    return true
}

function warehouse(grid, movements, robot) {
    let py = robot.y
    let px = robot.x

    let moved = {}
    const writeStream = fs.createWriteStream("output.txt", { flags: 'a' })
    let parse = str => str.split(",").map(x => +x)
    for (let char of movements) {
        moved = {};
        const [dx, dy] = directions[char]
        const res = move(grid, moved, py, px, dy, dx)
        if (res) {
            py += dy; px += dx;
            for (let k in moved) {
                let [y, x] = parse(k)
                grid[y][x] = moved[k]
            }
        }
        grid[py][px] = "@"
        print(grid, writeStream)
    }
    // print(grid)

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
        if (el[0] !== "#" && el !== "") movements += el.trim()
    })
    const newGrid = wider(grid)
    newGrid.forEach((row, index) => {
        const found = row.indexOf('@')
        if (found > 0) {
            robot.x = found
            robot.y = index
        }
    })

    warehouse(newGrid, movements, robot)
    gps(newGrid)
    return ''
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }