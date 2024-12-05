
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const checkOrder = (graph, update) => {
    const position = {};
    update.forEach((page, index) => {
        position[page] = index;
    });

    for (const [a, dependencies] of Object.entries(graph)) {
        if (!(a in position)) continue;
        for (const b of dependencies) {
            if (b in position && position[a] > position[b]) {
                return 0;
            }
        }
    }

    const middleIndex = Math.round(update.length / 2)
    return update[middleIndex - 1]
}

check = (data) => {
    const graph = {};
    const updates = []
    let skipSpace = false
    data.toString().split("\n").map(el => {
        if (el.includes('|')) {
            const [a, b] = el.split('|').map(Number);
            if (!graph[a]) graph[a] = new Set();
            graph[a].add(b);
        } else {
            if (!skipSpace) {
                skipSpace = true
                return
            }
            updates.push(el.split(',').map(el => +el.trim()))
        }
    });

    let result = 0
    updates.forEach((update) => {
        result += checkOrder(graph, update);
    });

    console.log(result);
    return 'res'
}


const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }