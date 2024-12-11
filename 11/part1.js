
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

const rules = [
    (x) => x === 0 ? { result: 1, valid: true } : { result: null, valid: false },
    (x) => {
        const str = String(x)
        if (str.length % 2 === 0) {
            const middleIndex = Math.ceil(str.length / 2)
            const firstHalf = str.slice(0, middleIndex)
            const secondHalf = str.slice(middleIndex)
            return { result: [Number(firstHalf), Number(secondHalf)], valid: true }
        }
        return { result: null, valid: false }
    },
    (x) => { return { result: x * 2024, valid: true } }

]

blink = (arr) => {
    return arr.reduce((acc, el) => {
        let newStone
        for (let i = 0; i < rules.length; i++) {
            const f = rules[i];
            const fResult = f(el)
            if (fResult.valid) {
                newStone = fResult.result
                // console.log('newStone', newStone, 'from', el);
                break;
            }

        }
        if (Array.isArray(newStone)) acc.push(...newStone)
        else acc.push(newStone)
        return acc
    }, [])
}

blinks = (arr) => {
    for (let index = 0; index < 75; index++) {
        arr = blink(arr)
    }
    console.log(arr.length);
}
check = (data) => {
    const arr = data.toString().split(" ").map(el => el.trim()).map(Number)

    // console.log(arr);
    blinks(arr)
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }