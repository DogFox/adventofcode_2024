
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

function sort(arr, reverse) {
    return [...arr].sort((a, b) => reverse ? b - a : a - b);
}

function isEqual(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
}

checkSafe = (levels) => {
    let safe = true
    const incr = sort(levels, false)
    const decr = sort(levels, true)

    const incrDecre = isEqual(levels, incr) || isEqual(levels, decr)
    for (let index = 0; index < levels.length; index++) {
        const dif = Math.abs(levels[index] - levels[index + 1])
        if (dif > 3 || dif < 1)
            safe = false
    }
    safe = safe && incrDecre
    return safe
}

check = (data) => {
    let count = 0
    const test = data.toString().split("\n").map(el => {
        const levels = el.split(" ").map(el => +el.trim())
        let good = false
        for (let index = 0; index < levels.length; index++) {
            const newStr = []
            levels.forEach((elem, index2) => {
                if (index2 != index) newStr.push(elem)
            })
            if (checkSafe(newStr))
                good = true
        }
        if (good) {
            count++
        }
    });

    console.log(count);
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }