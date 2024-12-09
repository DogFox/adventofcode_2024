
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
        if (fileFlag) {
            str = String(count)
            count++
        } else {
            str = '.'.repeat(Number(el))
        }
        fileFlag = !fileFlag
        return res
    }, [])
    return res
}

const sortBlocks = (string) => {
    let sum = 0
    let indFirst = 0
    let indLast = string.length - 1
    let trueString = string
    while (indFirst <= indLast) {
        if (string[indFirst] != '.') {
            sum += string[indFirst] * indFirst
            indFirst++
        }
        else {
            if (string[indLast] != '.') {
                sum += string[indLast] * indFirst

                trueString = replaceChar(trueString, indFirst, trueString[indLast])
                trueString = replaceChar(trueString, indLast, '.')

                indLast--
                indFirst++
            } else {
                indLast--
            }
        }
    }
    console.log(sum);
    let newSum = 0
    for (let i = 0; i < trueString.length; i++) {
        if (trueString[i] != '.') {
            newSum += trueString[i] * i
        }
    }
    console.log(newSum);

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