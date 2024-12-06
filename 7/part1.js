
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");


check = (data) => {
    const arr = []
    const guardPos = { x: 0, y: 0 }
    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(""))
    });

    let result = 0
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }