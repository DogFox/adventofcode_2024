
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

const printGrid = () => grid.forEach(row => console.log(row.join('')))

const arr = fileContent.split('\n').map(el => el.trim().split(',').map(Number))
const maxSize = 71
const rows = maxSize, cols = maxSize
const start = { x: 0, y: 0 }
const target = { x: maxSize - 1, y: maxSize - 1 }

const grid = Array.from({ length: maxSize }, () => Array.from({ length: maxSize }, () => '.'))

const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols && grid[y][x] != '#'

const bfs = () => {
    const queue = [[start.x, start.y, []]]
    const visited = new Set()
    visited.add(`${start.x},${start.y}`)
    const paths = []
    while (queue.length > 0) {
        const [x, y, path] = queue.shift()
        if (x === target.x && y === target.y) {
            const key = `${x},${y}`
            paths.push(...path)
            continue
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx
            const newY = y + dy
            if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
                visited.add(`${newX},${newY}`)
                queue.push([newX, newY, [...path, [x, y]]])
            }
        }
    }
    return paths;
}

for (let index = 0; index < 1024; index++) {
    const el = arr[index];
    grid[el[1]][el[0]] = '#'
}
const path = bfs()
console.log(path.length - 1);
// printGrid()

for (let index = 1024; index < arr.length; index++) {
    const el = arr[index];
    grid[el[1]][el[0]] = '#'
    const path = bfs()
    if (path.length == 0) {
        // printGrid()
        console.log(el);
        return
    }
}
