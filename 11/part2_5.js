
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

const rules = [
    // (x) => x === 0 ? { result: 1, valid: true } : { result: null, valid: false },
    (x) => {
        const str = String(x)
        const middleIndex = Math.ceil(str.length / 2)
        const firstHalf = str.slice(0, middleIndex)
        const secondHalf = str.slice(middleIndex)
        return [Number(firstHalf), Number(secondHalf)]
    },
    (x) => {
        const t = x * 2024
        return t
    }

]
const memoRec = new Map()

function recursiveFunction(el, times) {
    let count = 0

    if (memoRec.has(`${el}-${times}`)) {
        return memoRec.get(`${el}-${times}`)
    }

    if (times === 0) {
        return 1
    }

    if (el === 0) {
        el = 1
        const t = recursiveFunction(el, times - 1)
        count += t
        memoRec.set(`${el}-${times - 1}`, t)

    } else if (String(el).length % 2 === 0) {
        const newStone = rules[0](el)
        const t = recursiveFunction(newStone[0], times - 1)
        count += t
        const t2 = recursiveFunction(newStone[1], times - 1)
        count += t2
        memoRec.set(`${newStone[0]}-${times - 1}`, t)
        memoRec.set(`${newStone[1]}-${times - 1}`, t2)
    } else {
        el = rules[1](el)
        const t = recursiveFunction(el, times - 1)
        count += t
    }

    return count
}

const COUNT_BLINKS = 75
check = (data) => {
    const start = performance.now()

    let count = 0
    const arr = data.toString().split(" ").map(el => el.trim()).map(Number)

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        count += recursiveFunction(element, COUNT_BLINKS)
    }
    console.log(count)

    const end = performance.now()
    const duration = end - start
    const seconds = Math.floor(duration / 1000)
    const milliseconds = Math.floor(duration % 1000)
    console.log(`Время выполнения: ${seconds} s ${milliseconds} ms`)


    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }