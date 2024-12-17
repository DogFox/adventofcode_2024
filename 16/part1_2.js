
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")


class Graph {
    constructor(grid) {
        this.grid = grid
        this.rows = grid.length
        this.cols = grid[0].length
        this.directions = [
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 0]
        ]
    }

    isValid(x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.grid[x][y] != '#'
    }

    bfs() {
        const starts = this.findStarts()
        const target = 'E'
        const start = starts[0]
        const queue = [[start.x, start.y, 2, 0]]
        const visited = new Set()
        let score = 0
        while (queue.length > 0) {
            queue.sort((a, b) => a[3] - b[3]);
            let [x, y, direction, score] = queue.shift()

            const key = `${x},${y},${direction}`

            const currentNum = this.grid[x][y]
            if (currentNum === target) {
                return score
            }
            if (visited.has(key)) continue;

            visited.add(key);

            for (let index = 0; index < this.directions.length; index++) {
                const newDirection = index
                const [dx, dy] = this.directions[newDirection];
                const newX = x + dx
                const newY = y + dy
                if (this.isValid(newX, newY)) {
                    queue.push([newX, newY, newDirection, newDirection == direction ? score + 1 : score + 1001])
                }
            }
        }
        return score
    }
    findStarts() {
        let starts = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 'S') {
                    starts.push({ x: i, y: j })
                }
            }
        }
        return starts
    }
}

check = (data) => {
    const arr = []
    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(''))
    })

    const graph = new Graph(arr)
    const paths = graph.bfs()
    console.log(paths)

    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }