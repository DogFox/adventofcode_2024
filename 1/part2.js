
const { log } = require("console");
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");


check = (data) => {
    const leftArr = []
    const rightArr = {}

    const test = data.toString().split("\n").map(el => {
        let [left, right] = el.split('   ')
        left = left.trim()
        right = right.trim()

        leftArr.push(left)
        if (!rightArr[right]) rightArr[right] = 0
        rightArr[right] += 1
    });
    let result = 0
    console.log(rightArr);
    leftArr.forEach((el, index) => {
        if (rightArr[el]) {
            result += +el * +rightArr[el]
        }
    });
    return result
}

// console.time("Time this");
const res = check(fileContent);
// console.timeEnd("Time this");

fs.writeFileSync("output.txt", res.toString());

module.exports = { check }