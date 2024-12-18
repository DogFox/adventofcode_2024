
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")
function parseInput(str) {
    let registerA, registerB, registerC, program
    str.split('\n').forEach(row => {
        if (row.includes('Register A')) {
            registerA = Number(row.substring(row.indexOf(':') + 1).trim())
        }
        if (row.includes('Register B')) {
            registerB = Number(row.substring(row.indexOf(':') + 1).trim())
        }
        if (row.includes('Register C')) {
            registerC = Number(row.substring(row.indexOf(':') + 1).trim())
        }
        if (row.includes('Program')) {
            program = row.substring(row.indexOf(':') + 1).trim()
        }
    })

    return { registerA, registerB, registerC, program }

}

function getCombo(registy, a) {
    switch (a) {
        case '0': return 0
        case '1': return 1
        case '2': return 2
        case '3': return 3
        case '4': return registy.registerA
        case '5': return registy.registerB
        case '6': return registy.registerC
        default:
            break;
    }
}

function adv(registry, b) {
    const a = Number(registry.registerA)
    const combo = Number(getCombo(registry, b))
    const result = Math.trunc(a / Math.pow(2, combo))
    registry.registerA = result
    return
}
function bxl(registry, b) {
    const a = registry.registerB
    const result = a ^ b;
    registry.registerB = result
    return
}
function bst(registry, b) {
    const combo = Number(getCombo(registry, b))
    const result = combo % 8
    registry.registerB = result
    return
}
function jnz(registry, b) {
    if (registry.registerA !== 0) {
        return true
    }
    return
}

function bxc(registry) {
    const a = registry.registerB
    const b = registry.registerC
    const result = a ^ b;
    registry.registerB = result
    return
}
function out(registry, b, output) {
    const combo = Number(getCombo(registry, b))
    const result = combo % 8
    output.push(result)
    return

}
function bdv(registry, b) {
    const a = Number(registry.registerA)
    const combo = Number(getCombo(registry, b))
    const result = a / Math.pow(2, combo)
    registry.registerB = result
    return
}
function cdv(registry, b) {
    const a = Number(registry.registerA)
    const combo = Number(getCombo(registry, b))
    const result = a / Math.pow(2, combo)
    registry.registerC = result
    return
}


function run(registry, program) {
    const output = []
    for (let index = 0; index < program.length; index++) {
        const command = program[index];
        let res
        switch (command) {
            case '0':
                adv(registry, program[index + 1])
                index++
                break;
            case '1':
                bxl(registry, program[index + 1])
                index++
                break;
            case '2':
                bst(registry, program[index + 1])
                index++
                break;
            case '3':
                res = jnz(registry, program[index + 1])
                if (res) index = Number(program[index + 1] - 1)
                break;
            case '4':
                bxc(registry)
                index++
                break;
            case '5':
                out(registry, program[index + 1], output)
                index++
                break;
            case '6':
                bdv(registry, program[index + 1])
                index++
                break;
            case '7':
                cdv(registry, program[index + 1])
                index++
                break;

            default:
                break;
        }
    }
    return output.join(',')
}

const findInitialA = (sum, index = program.length - 1, program, registry) => {
    for (let i = 0; i < 8; i++) {
        let newSum = sum + Math.pow(8, index) * i
        registry.registerA = newSum;
        output = run(registry, program);
        let str = output.reverse().join('');
        if (output === program.join(',')) {
            console.log(newSum);
        } else {
            const finalVal = findInitialA(newSum, i - 1, program, registry);
        }
    }
};


check = (data) => {
    const { registerA, registerB, registerC, program: programStr } = parseInput(data)
    let registry = { registerA, registerB, registerC }

    const count = findInitialA(0, programStr.split(',').length - 1, programStr.split(','), registry)
    // let output = ''
    // let countSum = 1
    // let count = 100000
    // do {
    //     registry = { registerA, registerB, registerC }
    //     registry.registerA = count
    //     count += countSum

    //     output = run(registry, programStr)
    //     // if (count % 1000000 === 0) {
    //     console.log('count', count, 'program', output);
    //     // }
    // } while (output !== programStr)
    console.log(count);
    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }