
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

check = (data) => {
    const string = data.toString()
    let sum = 0
    let enabled = true
    const re = /mul\((-?\d{1,3}),(-?\d{1,3})\)|do\(\)|don't\(\)/g;
    let arrResult;
    do {
        arrResult = re.exec(string);
        if (arrResult) {
            switch (arrResult[0]) {
                case `don't()`: enabled = false
                    break;
                case `do()`: enabled = true
                    break;
                default:
                    if (enabled)
                        sum += Number(arrResult[1]) * Number(arrResult[2])
                    break;
            }
        }
    } while (arrResult);
    console.log(sum);
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }