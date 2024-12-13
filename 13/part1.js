
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
        this.x = Number(arr[1].split(',')[0].split('=')[1])
        this.y = Number(arr[1].split(',')[1].split('=')[1])
    }
}

const findChipestWay = (A, B, prize) => {

    const results = []
    const maxSteps = 100
    const Px = prize.x
    const Py = prize.y
    const Ax = A.x
    const Ay = A.y
    const Bx = B.x
    const By = B.y

    let minCost = Infinity
    let bestSolution = null

    for (let xA = 0; xA <= maxSteps; xA++) {
        for (let xB = 0; xB <= maxSteps; xB++) {
            const x = Ax * xA + Bx * xB
            const y = Ay * xA + By * xB

            if (x === Px && y === Py) {
                const cost = 3 * xA + 1 * xB
                if (cost < minCost) {
                    minCost = cost
                    bestSolution = { xA, xB, cost }
                }
            }
        }
    }

    return bestSolution

}

check = (data) => {
    const arr = data.toString().split("\n")

    let cost = 0
    for (let index = 0; index < arr.length; index) {
        const A = new Button(arr[index])
        const B = new Button(arr[index + 1])
        const prize = new Prize(arr[index + 2])
        index += 4
        const res = findChipestWay(A, B, prize)
        if (res) {
            console.log(res)
            cost += res.cost
        }
    }

    console.log(cost)
    // console.log(arr)
    // blinks(arr)
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }