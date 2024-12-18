
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
        const targetScore = 79404
        const start = starts[0]
        const queue = [[start.x, start.y, 2, 0, [[start.x, start.y]]]]
        const visited = new Map()
        const paths = []
        while (queue.length > 0) {
            // queue.sort((a, b) => a[3] - b[3]);
            let [x, y, direction, score, path] = queue.shift()

            const key = `${x},${y},${direction}`

            if (score > targetScore) continue;
            // if (visited.has(key)) continue;
            if (visited.has(key) && visited.get(key) < score) continue;
            visited.set(key, score);

            const currentNum = this.grid[x][y]
            if (currentNum === target && targetScore == score) {
                paths.push(...path)
                continue
            }

            for (let index = 0; index < this.directions.length; index++) {
                const newDirection = index
                const [dx, dy] = this.directions[newDirection];
                const newX = x + dx
                const newY = y + dy
                if (this.isValid(newX, newY)) {
                    queue.push([newX, newY, newDirection, newDirection == direction ? score + 1 : score + 1001, [...path, [newX, newY]]])
                }
            }
        }

        const set = new Set()
        paths.forEach((path) => {
            set.add(`${path[0]},${path[1]}`)
        });
        return set.size
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

    const start = performance.now()


    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(''))
    })

    const graph = new Graph(arr)
    const paths = graph.bfs()
    console.log(paths)

    const end = performance.now()
    const duration = end - start
    const seconds = Math.floor(duration / 1000)
    const milliseconds = Math.floor(duration % 1000)
    console.log(`Время выполнения: ${seconds} s ${milliseconds} ms`)

    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }