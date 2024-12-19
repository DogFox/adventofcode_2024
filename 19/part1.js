
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

const arr = fileContent.split('\n').map(el => el.trim())
const towelPatterns = arr[0].split(',').map(el => el.trim())
const designs = arr.slice(2)

const check = (design) => {
    const dp = Array(design.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= design.length; i++) {
        for (let pattern of towelPatterns) {
            if (i >= pattern.length && design.substring(i - pattern.length, i) === pattern) {
                dp[i] = dp[i] || dp[i - pattern.length];
            }
        }
    }

    return dp[design.length];
}

const start = performance.now()
let results = 0;
for (let design of designs) {
    if (check(design)) {
        results++
    }
}
console.log(results)

const end = performance.now()
const duration = end - start
const seconds = Math.floor(duration / 1000)
const milliseconds = Math.floor(duration % 1000)
console.log(`Время выполнения: ${seconds} s ${milliseconds} ms`)

