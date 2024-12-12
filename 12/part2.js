
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

class Graph {
    constructor(grid) {
        this.grid = grid
        this.rows = grid.length
        this.cols = grid[0].length
        this.directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ]
    }

    bfs(row, col, plantType, visited) {
        const queue = [[row, col]]
        let cells = new Set
        while (queue.length > 0) {
            const [x, y] = queue.pop()

            if (visited.has(`${x},${y}`))
                continue

            visited.add(`${x},${y}`)
            cells.add(`${x},${y}`)

            for (const [dx, dy] of this.directions) {
                const newX = x + dx
                const newY = y + dy

                if (newX >= 0 && newX < this.rows && newY >= 0 && newY < this.cols) {
                    if (this.grid[newX][newY] === plantType && !visited.has(`${newX},${newY}`)) {
                        queue.push([newX, newY])
                    }
                }
            }
        }
        return cells
    }

    calculateSides(regionCells) {
        let count = 0
        for (const cell of regionCells) {
            const [x, y] = cell.split(',').map(el => Number(el))
            count += !regionCells.has(`${x - 1},${y}`) && !regionCells.has(`${x},${y - 1}`)
            count += !regionCells.has(`${x + 1},${y}`) && !regionCells.has(`${x},${y - 1}`)
            count += !regionCells.has(`${x - 1},${y}`) && !regionCells.has(`${x},${y + 1}`)
            count += !regionCells.has(`${x + 1},${y}`) && !regionCells.has(`${x},${y + 1}`)

            count += regionCells.has(`${x - 1},${y}`) && regionCells.has(`${x},${y - 1}`) && !regionCells.has(`${x - 1},${y - 1}`)
            count += regionCells.has(`${x + 1},${y}`) && regionCells.has(`${x},${y - 1}`) && !regionCells.has(`${x + 1},${y - 1}`)
            count += regionCells.has(`${x - 1},${y}`) && regionCells.has(`${x},${y + 1}`) && !regionCells.has(`${x - 1},${y + 1}`)
            count += regionCells.has(`${x + 1},${y}`) && regionCells.has(`${x},${y + 1}`) && !regionCells.has(`${x + 1},${y + 1}`)
        }
        return count
    }

    calculateFencePrice() {
        const visited = new Set()
        let price = 0
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!visited.has(`${r},${c}`)) {
                    const plantType = this.grid[r][c]
                    const cells = this.bfs(r, c, plantType, visited)
                    const perimeter = this.calculateSides(cells)

                    price += cells.size * perimeter
                    // console.log(plantType, 'sides ', perimeter);
                }
            }
        }
        return price
    }

}

check = (data) => {
    const arr = []
    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(''))
    })

    const graph = new Graph(arr)
    const res = graph.calculateFencePrice()
    console.log(res)
    // console.log(arr)
    // blinks(arr)
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }