
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

function fixOrder(graph, update) {
    const inDegree = {};
    const adjList = {};
    update.forEach(page => {
        inDegree[page] = 0;
        adjList[page] = [];
    });
    for (const [a, dependencies] of Object.entries(graph)) {
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

const checkOrder = (graph, update) => {
    const position = {};
    update.forEach((page, index) => {
        position[page] = index;
    });

    let needToFix = false
    for (const [a, dependencies] of Object.entries(graph)) {
        if (!(a in position)) continue;
        for (const b of dependencies) {
            if (b in position && position[a] > position[b]) {
                needToFix = true
            }
        }
    }

    if (needToFix) {
        update = fixOrder(graph, update)
    } else {
        return 0
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