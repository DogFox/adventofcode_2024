
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

const findAntenas = (arr) => {
    const antenas = {}
    arr.forEach((element, i) => {
        element.forEach((el, j) => {
            if (/^[a-zA-Z0-9]/.test(el)) {
                if (!antenas[el]) antenas[el] = []
                antenas[el].push({ i: i, j: j })
            }
        })
    });
    return antenas
}

const findSignals = (arr, antenas) => {
    let signals = 0
    const signalsUnique = new Set()
    const rows = arr.length
    const cols = arr[0].length
    for (const [key, value] of Object.entries(antenas)) {
        for (let i = 0; i < value.length; i++) {
            for (let j = i + 1; j < value.length; j++) {
                const pointA = value[i];
                const pointB = value[j];

                const di = pointB.i - pointA.i;
                const dj = pointB.j - pointA.j;
                signalsUnique.add(JSON.stringify(pointA))
                signalsUnique.add(JSON.stringify(pointB))

                let nextPoint = { i: pointB.i + di, j: pointB.j + dj };
                while (nextPoint.i >= 0 && nextPoint.i < rows && nextPoint.j >= 0 && nextPoint.j < cols) {
                    signalsUnique.add(JSON.stringify(nextPoint))
                    nextPoint = { i: nextPoint.i + di, j: nextPoint.j + dj };
                }

                let prevPoint = { i: pointA.i - di, j: pointA.j - dj };
                while (prevPoint.i >= 0 && prevPoint.i < rows && prevPoint.j >= 0 && prevPoint.j < cols) {
                    signalsUnique.add(JSON.stringify(prevPoint))
                    prevPoint = { i: prevPoint.i - di, j: prevPoint.j - dj };
                }
            }
        }
    }
    console.log(signalsUnique.size);
}

check = (data) => {
    const arr = []
    data.toString().split("\n").map((el) => {
        arr.push(el.trim().split(''))
    });

    const antenas = findAntenas(arr)
    findSignals(arr, antenas)
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }