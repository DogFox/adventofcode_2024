
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

function fixOrder(order, update) {
    const inDegree = {};
    const adjList = {};
    update.forEach(page => {
        inDegree[page] = 0;
        adjList[page] = [];
    });

    for (const [a, dependencies] of Object.entries(order)) {
        if (!update.includes(Number(a))) continue;
        for (const b of dependencies) {
            if (update.includes(b)) {
                adjList[a].push(b);
                inDegree[b] += 1;
            }
        }
    }
    const queue = [];
    const sorted = [];

    for (const [page, degree] of Object.entries(inDegree)) {
        if (degree === 0) queue.push(Number(page));
    }

    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current);

        adjList[current].forEach(dep => {
            inDegree[dep] -= 1;
            if (inDegree[dep] === 0) queue.push(dep);
        });
    }

    return sorted;
}

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

    if (!valid) {
        const sorter = fixOrder(order, arr)
        return sorter[middleIndex - 1]
    }
    return 0
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