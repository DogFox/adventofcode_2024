
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const checkPage = (rules, pages, invert) => {
    if (!rules || !pages) return true

    const allExist = pages.every(element => {
        return invert ? !rules.includes(element) : rules.includes(element)
    });

    return allExist
}

const checkPages = (arr, order) => {
    const middleIndex = Math.round(arr.length / 2)
    let valid = arr.reduce((acc, el, index) => {
        const rules = order[el]
        const lastPages = arr.slice(index + 1);
        const valid = checkPage(rules, lastPages, false)
        if (!valid) acc = valid
        return acc
    }, true)

    valid = [...arr].reverse().reduce((acc, el, index, marr) => {
        const rules = order[el]
        const lastPages = marr.slice(index + 1);
        const valid = checkPage(rules, lastPages, true)
        if (!valid) acc = valid
        return acc
    }, true)

    if (valid) return arr[middleIndex - 1]
    else return 0
}

check = (data) => {
    const order = {}
    const updates = []
    let skipSpace = false
    data.toString().split("\n").map(el => {
        if (el.includes('|')) {
            const pages = el.split('|')
            if (!order[pages[0]]) {
                order[pages[0]] = []
            }
            order[pages[0]].push(+pages[1].trim())
        } else {
            if (!skipSpace) {
                skipSpace = true
                return
            }
            updates.push(el.split(',').map(el => +el.trim()))
        }
    });

    let result = 0
    updates.forEach(el => {
        result += checkPages(el, order)
    })

    console.log(result);
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }