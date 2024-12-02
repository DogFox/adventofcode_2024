
const { log } = require("console");
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

checkSafe = (str) => {
    const levels = str.split(" ")
    let current = null
    let increasing = false
    let decreasing = false
    let equal = false
    let maxDif = 0

    levels.forEach((el, index) => {
        if (current != null) {
            if (+el > +current) increasing = true
            if (+el < +current) decreasing = true
            if (+el == +current) equal = true
        }


        if (levels[index + 1]) {
            const dif = Math.abs(levels[index + 1] - el)
            // console.log(dif, levels[index + 1], el);
            maxDif = Math.max(maxDif, dif)
        }
        current = el
    })

    // console.log(increasing, decreasing, equal, maxDif);

    if (increasing && decreasing) return false
    if (equal) return false
    if (maxDif > 3) return false

    return true
}

check = (data) => {
    let count = 0
    const test = data.toString().split("\n").map(el => {
        const safe = checkSafe(el)
        console.log(safe, '      ', el);
        if (safe) {
            count++
        }

    });

    console.log(count);
    return 'res'
}

// console.time("Time this");
const res = check(fileContent);
// console.timeEnd("Time this");

fs.writeFileSync("output.txt", res.toString());

module.exports = { check }