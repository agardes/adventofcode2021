const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\n")

let depthPt1 = 0
let depthPt2 = 0
let horizontal= 0
let aim = 0

for(let i=0; i<data.length;i++){
    let el = data[i].split(' ')
    let dir = el[0]
    let amount = parseInt(el[1])
    switch(dir){
        case 'forward':
            horizontal += amount
            depthPt2 += aim*amount
            break
        case 'down':
            depthPt1+=amount
            aim += amount
            break
        case "up":
            depthPt1-=amount
            aim -= amount
            break
    }
}
console.log(`Part one = ${depthPt1*horizontal}
Part two = ${depthPt2*horizontal}`)