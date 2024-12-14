
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

class Robot {
    constructor(str) {
        const arr = str.split(' ');
        this.x = Number(arr[0].split('=')[1].split(',')[0])
        this.y = Number(arr[0].split('=')[1].split(',')[1])
        this.vX = Number(arr[1].split('=')[1].split(',')[0])
        this.vY = Number(arr[1].split('=')[1].split(',')[1])
        this.startX = this.x
        this.startY = this.y

        this.sizeX = 101
        this.sizeY = 103
    }

    moves(times) {
        if (this.vX < 0) this.vX += this.sizeX
        if (this.vY < 0) this.vY += this.sizeY
        this.x = (this.vX * times + this.x) % this.sizeX
        this.y = (this.vY * times + this.y) % this.sizeY
    }
    getPosition() {
        const pos = { x: this.x, y: this.y }
        this.x = this.startX
        this.y = this.startY
        return pos
    }
}

check = (data) => {
    const arr = data.toString().split("\n")
    const robots = []
    for (let index = 0; index < arr.length; index++) {
        const robot = new Robot(arr[index])
        robots.push(robot)
    }
    const writeStream = fs.createWriteStream("output.txt", { flags: 'a' })

    for (let index = 8000; index < 9000; index++) {
        const itog = Array.from({ length: 103 }, () => Array(101).fill("."))

        robots.forEach(element => {
            element.moves(index)
            const pos = element.getPosition()
            const y = pos.y
            const x = pos.x
            itog[y][x] = "*"
        });

        for (let i = 0; i < 103; i++) {
            writeStream.write(itog[i].join('') + '\n')
        }
        writeStream.write('\n')
        writeStream.write(index + '\n')
        writeStream.write('\n')
    }

    writeStream.end(() => {
        console.log('Запись в файл завершена!')
    });

    writeStream.on('error', (err) => {
        console.error('Ошибка записи в файл:', err)
    });
    return 'res'
}

const res = check(fileContent)
// fs.writeFileSync("output.txt", res.toString())
module.exports = { check }