
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const operations = {
    '+': (x, y) => x + y,
    '-': (x, y) => Number(String(x) + String(y)),
    '*': (x, y) => x * y,
};

const getAllCombinations = (operators, length) => {
    if (length === 0) return [''];
    const combinations = [];
    for (let char of operators) {
        const subCombinations = getAllCombinations(operators, length - 1);
        subCombinations.forEach(subComb => combinations.push(char + subComb));
    }
    return combinations;
}

const checkAssert = (res, operands, operatorsStr) => {
    let good = false
    operatorsStr.forEach(element => {
        const operators = element.split('')
        const result = operators.reduce((acc, el, index) => {
            if (index == 0) {
                acc += operations[el](operands[index], operands[index + 1])
            } else {
                acc = operations[el](acc, operands[index + 1])
            }
            return acc
        }, 0);

        if (result == res) {
            good = true
        }
    });
    return good
}

const findOperators = (arr) => {
    const operators = ['*', '+', "-"]
    let results = 0
    arr.map(el => {
        const res = +el[0]
        const operands = el[1].trim().split(" ").map(Number)

        const combinations = getAllCombinations(operators, operands.length - 1)
        const set = checkAssert(res, operands, combinations)
        if (set) {
            results += res
        }
    })
    return results
}

check = (data) => {
    const arr = []
    const guardPos = { x: 0, y: 0 }
    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(":"))
    });

    let result = 0

    result = findOperators(arr)
    console.log(result);
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }