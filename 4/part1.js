
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");


const checkX = (arr, x, y) => {
    let count = 0
    //вертикальные и горизонтальные
    if (arr[x + 1] && arr[x + 2] && arr[x + 3] && arr[x + 1][y] === "M" && arr[x + 2][y] === "A" && arr[x + 3][y] === "S") count++
    if (arr[x - 1] && arr[x - 2] && arr[x - 3] && arr[x - 1][y] === "M" && arr[x - 2][y] === "A" && arr[x - 3][y] === "S") count++
    if (arr[x][y + 1] === "M" && arr[x][y + 2] === "A" && arr[x][y + 3] === "S") count++
    if (arr[x][y - 1] === "M" && arr[x][y - 2] === "A" && arr[x][y - 3] === "S") count++
    //диагонали
    if (arr[x + 1] && arr[x + 2] && arr[x + 3] && arr[x + 1][y + 1] === "M" && arr[x + 2][y + 2] === "A" && arr[x + 3][y + 3] === "S") count++
    if (arr[x + 1] && arr[x + 2] && arr[x + 3] && arr[x + 1][y - 1] === "M" && arr[x + 2][y - 2] === "A" && arr[x + 3][y - 3] === "S") count++
    if (arr[x - 1] && arr[x - 2] && arr[x - 3] && arr[x - 1][y - 1] === "M" && arr[x - 2][y - 2] === "A" && arr[x - 3][y - 3] === "S") count++
    if (arr[x - 1] && arr[x - 2] && arr[x - 3] && arr[x - 1][y + 1] === "M" && arr[x - 2][y + 2] === "A" && arr[x - 3][y + 3] === "S") count++

    return count
}
const checkXMAS = (arr, x, y) => {
    let count = 0

    if (arr[x - 1] && arr[x + 1] && arr[x - 1][y + 1] === "M" && arr[x + 1][y - 1] === "S" && arr[x - 1][y - 1] === "M" && arr[x + 1][y + 1] === "S") count++
    if (arr[x - 1] && arr[x + 1] && arr[x - 1][y + 1] === "M" && arr[x + 1][y - 1] === "S" && arr[x - 1][y - 1] === "S" && arr[x + 1][y + 1] === "M") count++
    if (arr[x - 1] && arr[x + 1] && arr[x - 1][y + 1] === "S" && arr[x + 1][y - 1] === "M" && arr[x - 1][y - 1] === "S" && arr[x + 1][y + 1] === "M") count++
    if (arr[x - 1] && arr[x + 1] && arr[x - 1][y + 1] === "S" && arr[x + 1][y - 1] === "M" && arr[x - 1][y - 1] === "M" && arr[x + 1][y + 1] === "S") count++

    return count
}

check = (data) => {
    const arrLetter = []
    const test = data.toString().split("\n").map(el => {
        arrLetter.push(el.split(""))
    });

    let countAll = 0
    let countAll2 = 0
    for (let rowIndex = 0; rowIndex < arrLetter.length; rowIndex++) {
        const row = arrLetter[rowIndex];

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const letter = row[colIndex];
            if (letter === 'X') {
                countAll += checkX(arrLetter, rowIndex, colIndex)
            }
            if (letter === 'A') {
                countAll2 += checkXMAS(arrLetter, rowIndex, colIndex)
            }
        }
    }

    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }