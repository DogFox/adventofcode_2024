
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
        this.times = null
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
                current.value = 1
            }
            else if (String(current.value).length % 2 === 0) {
                newStone = rules[0](current.value)
                this.prepend(newStone[0])
                current.value = newStone[1]
            } else {
                current.value = rules[1](current.value)
            }
            current = current.next
        }
        this.times--
    }

    flash() {
        let current = this.head
        while (current) {
            let count = 0
            let list = new LinkedList()
            this.size--
            list.append(current.value)
            count += list.blinks(this.times)
            list = null
            this.size += count
            current = current.next
        }
        this.head = null
    }

    blinks(times) {
        this.times = times
        for (let index = 0; index < times; index++) {
            if (this.size > 10000) {
                this.flash()
            } else {
                this.blink()
            }
        }
        return this.size
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
const COUNT_BLINKS = 50
check = (data) => {
    const start = performance.now();
    // const list = new LinkedList()
    // data.toString().split(" ").map(el => el.trim()).map(Number).forEach(e => list.append(e))
    // console.log(list.blinks())

    let count = 0
    const arr = data.toString().split(" ").map(el => el.trim()).map(Number)

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        let list = new LinkedList()
        list.append(element)
        count += list.blinks(COUNT_BLINKS)
        list = null
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