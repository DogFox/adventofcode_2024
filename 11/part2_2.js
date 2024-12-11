
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
        let current = this.head
        while (current) {
            let newStone
            if (current.value === 0) {
                newStone = 1
            }
            else if (String(current.value).length % 2 === 0) {
                newStone = rules[0](current.value)
            } else {
                newStone = rules[1](current.value)
            }

            if (Array.isArray(newStone)) {
                this.prepend(newStone[0])
                current.value = newStone[1]
            }
            else {
                current.value = newStone
            }
            current = current.next
        }
        this.printList()
    }

    blinks() {
        for (let index = 0; index < 6; index++) {
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
    (x) => {
        const str = String(x)
        const middleIndex = Math.ceil(str.length / 2)
        const firstHalf = str.slice(0, middleIndex)
        const secondHalf = str.slice(middleIndex)
        return [Number(firstHalf), Number(secondHalf)]
    },
    (x) => x * 2024

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