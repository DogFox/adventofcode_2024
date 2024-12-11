
const fs = require("fs")
let fileContent = fs.readFileSync("input.txt", "utf8")

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }

    append(value) {
        const newNode = new Node(value)
        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.size++
    }
    prepend(value) {
        const newNode = new Node(value)
        newNode.next = this.head
        this.head = newNode
        this.size++
    }
    blink() {
        let prev = null
        let current = this.head
        while (current) {
            let newStone
            for (let i = 0; i < rules.length; i++) {
                const f = rules[i]
                const fResult = f(current.value)
                if (fResult.valid) {
                    newStone = fResult.result
                    break
                }
            }

            if (Array.isArray(newStone)) {
                this.prepend(newStone[0])
                current.value = newStone[1]
                prev = current
            }
            else {
                current.value = newStone
                prev = current
            }

            current = current.next
        }
    }

    blinks() {
        for (let index = 0; index < 25; index++) {
            this.blink()
        }
        console.log(this.size)
    }

    printList() {
        let current = this.head
        const result = []
        while (current) {
            result.push(String(current.value))
            current = current.next
        }
        console.log(result.join(" "))
    }
}

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

check = (data) => {
    const list = new LinkedList()

    data.toString().split(" ").map(el => el.trim()).map(Number).forEach(e => list.append(e))
    list.blinks()

    return 'res'
}

const res = check(fileContent)
fs.writeFileSync("output.txt", res.toString())
module.exports = { check }