
const { log } = require("console");
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");


check = (data) => {
    const leftArr = [], rightArr = []
    const test = data.toString().split("\n").map(el => {
        const [left, right] = el.split('   ')
        leftArr.push(left)
        rightArr.push(right)
    });

    leftArr.sort((a, b) => a <= b ? -1 : 1)
    rightArr.sort((a, b) => a <= b ? -1 : 1)

    let distance = 0

    leftArr.forEach((el, index) => {
        if (leftArr[index] >= rightArr[index])
            distance += leftArr[index] - rightArr[index]
        else
            distance += rightArr[index] - leftArr[index]

    });
    console.log(distance);

    return 'res'
}

// console.time("Time this");
const res = check(fileContent);
// console.timeEnd("Time this");

fs.writeFileSync("output.txt", res.toString());

module.exports = { check }