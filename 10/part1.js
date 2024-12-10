
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

    isValid(x, y, current) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.grid[x][y] === current + 1
    }
    bfs() {
        const starts = this.findStarts()
        const target = 9
        const scorePaths = []
        starts.forEach(start => {
            const paths = {}
            const queue = [[start.x, start.y, []]]
            const visited = new Set()
            visited.add(`${start.x},${start.y}`)
            while (queue.length > 0) {
                const [x, y, path] = queue.shift()
                const currentNum = this.grid[x][y]

                if (currentNum === target) {
                    const key = `${x},${y}`
                    if (!paths.key) paths[key] = []
                    paths[key].push(...path)
                    // paths.push([...path, [x, y]])
                    continue
                }

                for (const [dx, dy] of this.directions) {
                    const newX = x + dx
                    const newY = y + dy
                    if (this.isValid(newX, newY, currentNum) && !visited.has(`${newX},${newY}`)) {
                        visited.add(`${newX},${newY}`)
                        queue.push([newX, newY, [...path, [x, y]]])
                    }
                }
            }

            const result = { start: `${start.x},${start.y}`, dest: Object.keys(paths), score: Object.keys(paths).length }
            scorePaths.push(result)
        })
        return scorePaths
    }
    dfs(x, y, currentNum, path, allPaths) {
        if (currentNum === 9) {
            allPaths.push([...path, [x, y]])
            return
        }

        for (const [dx, dy] of this.directions) {
            const newX = x + dx
            const newY = y + dy
            if (this.isValid(newX, newY, currentNum) && !path.some(p => p[0] === newX && p[1] === newY)) {
                path.push([x, y])
                this.dfs(newX, newY, currentNum + 1, path, allPaths)
                path.pop()
            }
        }
    }
    findAllPaths() {
        return this.bfs()
    }
    findStarts() {
        let starts = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
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
        arr.push(el.trim().split('').map(Number))
    })

    const graph = new Graph(arr)
    const paths = graph.findAllPaths()
    let sum = 0
    paths.forEach(el => {
        sum += el.score
    })
    console.log(paths)
    console.log(sum)

    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }