
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const goUp = (guardPos, positions, arr) => {
    let goUp = true
    do {
        let curRow = guardPos.y
        let curCol = guardPos.x

        if (!arr[curRow - 1] || !arr[curRow - 1][curCol]) {
            return false
        }
        if (arr[curRow - 1][curCol] != '#') {
            guardPos.y = curRow - 1
            guardPos.x = curCol
            positions.add(guardPos.y + ' ' + guardPos.x)
        } else {
            goUp = false
        }

    } while (goUp)

    return true
}

const goRight = (guardPos, positions, arr) => {
    let goRight = true
    do {
        let curRow = guardPos.y
        let curCol = guardPos.x

        if (!arr[curRow] || !arr[curRow][curCol + 1]) {
            return false
        }
        if (arr[curRow][curCol + 1] != '#') {
            guardPos.y = curRow
            guardPos.x = curCol + 1
            positions.add(guardPos.y + ' ' + guardPos.x)
        } else {
            goRight = false
        }

    } while (goRight)

    return true
}

const goDown = (guardPos, positions, arr) => {
    let goDown = true
    do {
        let curRow = guardPos.y
        let curCol = guardPos.x

        if (!arr[curRow + 1] || !arr[curRow + 1][curCol]) {
            return false
        }
        if (arr[curRow + 1][curCol] != '#') {
            guardPos.y = curRow + 1
            guardPos.x = curCol
            positions.add(guardPos.y + ' ' + guardPos.x)
        } else {
            goDown = false
        }

    } while (goDown)

    return true
}
const goLeft = (guardPos, positions, arr) => {
    let goLeft = true
    do {
        let curRow = guardPos.y
        let curCol = guardPos.x

        if (!arr[curRow] || !arr[curRow][curCol - 1]) {
            return false
        }
        if (arr[curRow][curCol - 1] != '#') {
            guardPos.y = curRow
            guardPos.x = curCol - 1
            positions.add(guardPos.y + ' ' + guardPos.x)
        } else {
            goLeft = false
        }

    } while (goLeft)

    return true
}

const move = (arr, guardPos) => {
    const positions = new Set()

    const m = arr.length
    const n = arr[0].length

    let canContinue = true
    while (canContinue) {
        canContinue = goUp(guardPos, positions, arr)
        if (canContinue)
            canContinue = goRight(guardPos, positions, arr)
        if (canContinue)
            canContinue = goDown(guardPos, positions, arr)
        if (canContinue)
            canContinue = goLeft(guardPos, positions, arr)
    }

    console.log(positions.size + 1);
}

check = (data) => {
    const arr = []
    const guardPos = { x: 0, y: 0 }
    data.toString().split("\n").map((el, index) => {
        if (el.indexOf("^") > 0) {//|| el.includes(">") || el.includes("<") || el.includes("v"))
            guardPos.x = el.indexOf("^")
            guardPos.y = index
        }
        arr.push(el.trim().split(""))
    });

    move(arr, guardPos)

    let result = 0
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }