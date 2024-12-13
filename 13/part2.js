
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

class Button {
    constructor(str) {
        const arr = str.split(':')
        this.x = Number(arr[1].split(',')[0].split('+')[1])
        this.y = Number(arr[1].split(',')[1].split('+')[1])
    }
}
class Prize {
    constructor(str) {
        const arr = str.split(':')
        this.x = 10000000000000 + Number(arr[1].split(',')[0].split('=')[1])
        this.y = 10000000000000 + Number(arr[1].split(',')[1].split('=')[1])
    }
}

const isInteger = (num) => {
    const str = String(num)
    const arr = str.split('.')
    return +arr[1] === 0;
}

const gause = (x1, y1, x2, y2, x, y) => {
    let str1 = [x1, x2, x]
    let str2 = [y1, y2, y]

    str1 = str1.map(el => el / x1)

    str2 = str2.map((el, index) => el - str1[index] * y1)

    const elStr2 = str2[1]
    str2 = str2.map((el) => el / elStr2)

    const elStr1 = str1[1]
    str1 = str1.map((el, index) => el - str2[index] * elStr1)

    const res = { x: str1[2].toFixed(2), y: str2[2].toFixed(2) }
    return res
}

const findChipestWay = (A, B, prize) => {
    const Px = prize.x
    const Py = prize.y
    const Ax = A.x
    const Ay = A.y
    const Bx = B.x
    const By = B.y

    let bestSolution = null;

    bestSolution = gause(Ax, Ay, Bx, By, Px, Py)
    if (bestSolution && isInteger(bestSolution.x) && isInteger(bestSolution.y) && bestSolution.x > 0 && bestSolution.y > 0) {
        const cost = 3 * bestSolution.x + 1 * bestSolution.y;
        return { xA: bestSolution.x, xB: bestSolution.y, cost };
    }
    return 0

}

check = (data) => {
    const arr = data.toString().split("\n")

    let cost = 0
    for (let index = 0; index < arr.length; index) {
        const A = new Button(arr[index]);
        const B = new Button(arr[index + 1]);
        const prize = new Prize(arr[index + 2])
        index += 4
        const res = findChipestWay(A, B, prize)
        if (res) {
            cost += res.cost
        }
    }

    console.log(cost)
    return 'res'
}
const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }