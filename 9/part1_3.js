
const fs = require("fs");
let fileContent = fs.readFileSync("input.txt", "utf8");

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    printForward() {
        let current = this.head;
        const result = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(""));
    }
    checksum() {
        let sum = 0
        let index = 0;
        let indFirst = this.head
        let indLast = this.tail

        while (indFirst && indLast && indFirst !== indLast && indFirst.prev !== indLast) {
            if (indFirst.value != '.') {
                sum += indFirst.value * index
                index++
                indFirst = indFirst.next
            }
            else {
                if (indLast.value != '.') {
                    sum += indLast.value * index
                    index++
                    indFirst = indFirst.next
                    indLast = indLast.prev
                } else {
                    indLast = indLast.prev
                }
            }
        }
        sum += indLast.value * index

        console.log(sum);
    }
}

const replaceChar = (str, index, newChar) =>
    index >= 0 && index < str.length
        ? str.slice(0, index) + newChar + str.slice(index + 1)
        : str;

const getBlocks = (string) => {
    let count = 0
    let fileFlag = true

    const list = new DLL();
    string.split('').forEach((el) => {
        if (fileFlag) {
            for (let index = 0; index < Number(el); index++) {
                list.append(String(count))
            }
            count++
        } else {
            for (let index = 0; index < Number(el); index++) {
                list.append('.')
            }
        }
        fileFlag = !fileFlag
    })
    list.printForward()
    return list
}

check = (data) => {
    const str = data.toString().trim()

    const blocks = getBlocks(str)
    blocks.checksum()
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }