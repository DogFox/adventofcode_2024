
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

    isValid(x, y) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.grid[x][y] != '#'
    }
    calculateScore(path) {
        let score = 0;
        const directions = [
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: -1 }
        ];
        let currentDirection = 0;
        for (let i = 1; i < path.length; i++) {
            const [x1, y1] = path[i - 1];
            const [x2, y2] = path[i];
            let newDirection;

            if (x2 === x1 && y2 === y1 + 1) {
                newDirection = 1;
            } else if (x2 === x1 && y2 === y1 - 1) {
                newDirection = 3;
            } else if (x2 === x1 + 1 && y2 === y1) {
                newDirection = 0;
            } else if (x2 === x1 - 1 && y2 === y1) {
                newDirection = 2;
            }
            if (newDirection !== undefined && newDirection !== currentDirection) {
                score += 1000;
            }
            score += 1;

            currentDirection = newDirection;
        }

        return score;
    }
    bfs() {
        const starts = this.findStarts()
        const target = 'E'
        const scorePaths = []
        starts.forEach(start => {
            const paths = {}
            const score = 0
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

            for (const key of Object.keys(paths)) {
                const path = paths[key]
                const score = this.calculateScore(path)
                console.log(score);
            }
            const result = { start: `${start.x},${start.y}`, dest: Object.keys(paths), score: Object.keys(paths).length }
            scorePaths.push(result)
        })
        return scorePaths
    }
    dfs(x, y, path, currentDirection, score, allPaths) {
        if (this.grid[x][y] === 'E') {
            allPaths.push(this.calculateScore([...path, [x, y]]))
            return
        }
        let newDirection = currentDirection
        for (const [dx, dy] of this.directions) {
            const newX = x + dx
            const newY = y + dy
            if (this.isValid(newX, newY) && !path.some(p => p[0] === newX && p[1] === newY)) {

                // if (newX === x && newY === y + 1) {
                //     newDirection = 1;
                // } else if (newX === x && newY === y - 1) {
                //     newDirection = 3;
                // } else if (newX === x + 1 && newY === y) {
                //     newDirection = 0;
                // } else if (newX === x - 1 && newY === y) {
                //     newDirection = 2;
                // }
                // if (newDirection !== undefined && newDirection !== currentDirection) {
                //     score += 1000;
                // }
                // score += 1;

                path.push([x, y])
                this.dfs(newX, newY, path, newDirection, score, allPaths)
                path.pop()
            }
        }
        return score
    }
    findAllPaths() {
        const starts = this.findStarts()
        const scorePaths = []
        starts.forEach(start => {
            const allPaths = []
            let score = 0
            this.dfs(start.x, start.y, [], null, score, allPaths)

            let minScore = null
            allPaths.forEach(el => {
                minScore = minScore == null ? el : Math.min(minScore, el)
            })
            const result = { start: `${start.x},${start.y}`, score: minScore }
            scorePaths.push(result)
        })
        return scorePaths
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
    const paths = graph.findAllPaths()
    let sum = 0

    paths.forEach(el => {
        sum += el.score
    })
    console.log(sum)

    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }