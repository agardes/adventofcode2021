const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\n").map(Number);

let partOne = data.filter((el,i,arr)=>el<arr[i+1]).length
let partTwo = data.map((el,i,arr)=>el+arr[i+1]+arr[i+2]).filter(el=>!isNaN(el)).filter((el,i,arr)=>el<arr[i+1]).length

console.log(`Part one = ${partOne}
Part two = ${partTwo}`)
