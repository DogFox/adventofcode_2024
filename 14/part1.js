
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

class Robot {
    constructor(str) {
        const arr = str.split(' ');
        this.x = Number(arr[0].split('=')[1].split(',')[0])
        this.y = Number(arr[0].split('=')[1].split(',')[1])
        this.vX = Number(arr[1].split('=')[1].split(',')[0])
        this.vY = Number(arr[1].split('=')[1].split(',')[1])

        this.sizeX = 101
        this.sizeY = 103
    }

    move() {
        // console.log('before', this.x, this.y, this.vX, this.vY)
        this.x += this.vX
        this.y += this.vY
        // console.log('move', this.x, this.y)

        if (this.x >= this.sizeX) {
            this.x = this.x - this.sizeX
        }
        if (this.y >= this.sizeY) {
            this.y = this.y - this.sizeY
        }
        if (this.x < 0) {
            this.x = this.sizeX + this.x
        }
        if (this.y < 0) {
            this.y = this.sizeY + this.y
        }
        // console.log('after', this.x, this.y, this.vX, this.vY)
    }

    moves() {
        for (let index = 0; index < 100; index++) {
            this.move()
        }

        // console.log(this.x, this.y)
    }
    getPosition() {
        return { x: this.x, y: this.y }
    }
}

function count(grid) {
    const rows = grid.length
    const cols = grid[0].length
    const centerX = Math.floor(rows / 2)
    const centerY = Math.floor(cols / 2)

    let topLeft = 0
    let topRight = 0
    let bottomLeft = 0
    let bottomRight = 0

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === centerX || j === centerY) continue
            if (grid[i][j] === '.') continue

            if (i < centerX && j < centerY) {
                topLeft += grid[i][j]
            } else if (i < centerX && j > centerY) {
                topRight += grid[i][j]
            } else if (i > centerX && j < centerY) {
                bottomLeft += grid[i][j]
            } else if (i > centerX && j > centerY) {
                bottomRight += grid[i][j]
            }
        }
    }
    // console.log(topLeft, topRight, bottomLeft, bottomRight)
    return topLeft * topRight * bottomLeft * bottomRight
}


check = (data) => {

    const itog = []
    for (let i = 0; i < 103; i++) {
        if (!itog[i]) itog[i] = []

        for (let j = 0; j < 101; j++) {
            itog[i][j] = '.'
        }
    }

    const arr = data.toString().split("\n")
    for (let index = 0; index < arr.length; index++) {
        const robot = new Robot(arr[index])
        robot.moves()
        const pos = robot.getPosition()
        const y = pos.y
        const x = pos.x
        if (itog[y][x] === '.') itog[y][x] = 1
        else itog[y][x] += 1
    }

    const result = count(itog);
    console.log(result);
    for (let i = 0; i < 103; i++) {
        console.log(itog[i].join(''))
    }
    // console.log(arr)
    // blinks(arr)
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }