
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");


const replaceChar = (str, index, newChar) =>
    index >= 0 && index < str.length
        ? str.slice(0, index) + newChar + str.slice(index + 1)
        : str;

const getBlocks = (string) => {
    let count = 0
    let fileFlag = true
    const res = string.split('').reduce((acc, el) => {
        let str = ''
        if (fileFlag) {
            str = String(count)[0].repeat(Number(el))
            count++
            // count = count == 10 ? 0 : count
        } else {
            str = '.'.repeat(Number(el))
        }
        fileFlag = !fileFlag
        return acc + str
    }, '')
    return res
}

const sortBlocks = (string) => {
    let sum = 0
    let indFirst = 0
    let indLast = string.length - 1
    // console.log(string);
    while (indFirst <= indLast) {
        if (string[indFirst] != '.') {
            sum += string[indFirst] * indFirst
            indFirst++
        }
        else {
            let cond = true
            while (cond) {
                if (string[indLast] === '.') {
                    indLast--
                }
                if (string[indLast] != '.') {
                    string = replaceChar(string, indFirst, string[indLast])
                    string = replaceChar(string, indLast, '.')
                }
                // console.log(indFirst, indLast, string[indFirst]);
                if (string[indFirst] != '.' || indFirst == indLast) { cond = false }

            }
            if (string[indFirst] != '.')
                sum += string[indFirst] * indFirst
            indFirst++
        }
        // console.log(string, sum);
        // if (indFirst < 100)
        // console.log(indFirst, indLast);

    }

    console.log(sum);
}

check = (data) => {
    const str = data.toString().trim()

    const blocks = getBlocks(str)
    sortBlocks(blocks)
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }