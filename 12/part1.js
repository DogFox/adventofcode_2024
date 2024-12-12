
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
        let cells = 0
        let perimeter = 0
        while (queue.length > 0) {
            const [x, y] = queue.pop()

            if (visited.has(`${x},${y}`))
                continue

            visited.add(`${x},${y}`)
            cells++

            for (const [dx, dy] of this.directions) {
                const newX = x + dx
                const newY = y + dy

                if (newX >= 0 && newX < this.rows && newY >= 0 && newY < this.cols) {
                    if (this.grid[newX][newY] === plantType && !visited.has(`${newX},${newY}`)) {
                        queue.push([newX, newY])
                    } else if (this.grid[newX][newY] !== plantType) {
                        perimeter++
                    }
                } else {
                    perimeter++
                }
            }
        }
        // console.log(plantType, 'area:', cells, 'per', perimeter)
        return { cells, perimeter }
    }

    calculateFencePrice() {
        const visited = new Set()
        let price = 0
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!visited.has(`${r},${c}`)) {
                    const plantType = this.grid[r][c]
                    const { cells, perimeter } = this.bfs(r, c, plantType, visited)
                    price += cells * perimeter
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