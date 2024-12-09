
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

    printForward() {
        let current = this.head;
        const result = [];
        while (current) {
            result.push(String(current.value.id).repeat(Number(current.value.length)));
            current = current.next;
        }
        console.log(result.join(""));
    }

    sort() {
        let tail = this.tail
        while (tail) {
            if (!tail.value.space) {
                let current = this.head;
                while (current && tail && current !== tail && current.prev !== tail) {
                    if (current.value.space && current.value.length >= tail.value.length) {
                        if (current.value.length > tail.value.length) {
                            const value = { length: current.value.length - tail.value.length, id: '.', space: true }
                            const newNode = new Node(value);

                            newNode.next = current.next;
                            newNode.prev = current;

                            if (current.next) {
                                current.next.prev = newNode;
                            }
                            current.next = newNode;
                        }

                        current.value.length = tail.value.length
                        current.value.id = tail.value.id
                        current.value.space = false
                        tail.value.id = '.'
                        tail.value.space = true
                        break;
                    }
                    current = current.next;
                }
            }
            tail = tail.prev
        }
    }
    checksum() {
        let sum = 0
        let index = 0;
        let left = this.head

        while (left) {
            if (left.value.id != '.') {
                for (let ind = 0; ind < left.value.length; ind++) {
                    sum += left.value.id * index
                    index++
                }
            } else {
                index += left.value.length
            }
            left = left.next
        }
        console.log(sum);
    }
}

const getBlocks = (string) => {
    let count = 0
    let fileFlag = true

    const list = new DLL();
    string.split('').forEach((el) => {
        if (fileFlag) {
            const file = { length: Number(el), id: count, space: false }
            list.append(file)
            count++
        } else {
            const space = { length: Number(el), id: '.', space: true }
            list.append(space)
        }
        fileFlag = !fileFlag
    })
    return list
}

check = (data) => {
    const start = performance.now();
    const str = data.toString().trim()
    const blocks = getBlocks(str)
    blocks.sort()
    blocks.checksum()
    const end = performance.now();
    const duration = end - start;
    const seconds = Math.floor(duration / 1000);  
    const milliseconds = Math.floor(duration % 1000);  
    console.log(`Время выполнения: ${seconds} s ${milliseconds} ms`);
    return 'res'
}

const res = check(fileContent);
fs.writeFileSync("output.txt", res.toString());
module.exports = { check }