const fs = require('fs');
const read = fs.readFileSync("input.txt");
const data = read.toString().split("\r\n")

let risk = 0
let lowpoints = []
let length = data[0].length

function getAdjacent(rowY, nbX){
    let adj = []
    let top =  [rowY-1, nbX]
    let btm =  [rowY+1, nbX]
    let left = [rowY, nbX-1]
    let right = [rowY, nbX+1]
    
    if(rowY!==0){
        adj.push(top)
    }
    if(rowY!==data.length-1){
        adj.push(btm)
    }
    if(nbX!==0){
        adj.push(left)
    }
    if(nbX!==length-1){
        adj.push(right)
    }
    return adj
}

data.forEach((row,i,arr)=>{
    for(let j=0;j<length;j++){
        let current = parseInt(row[j])
        let adj = getAdjacent(i,j)
        let isLow = true
        adj.forEach(ind=>{
            if(current >= parseInt(arr[ind[0]][ind[1]])){
                isLow = false
            }
        })
        if(isLow){
            risk += current+1
            lowpoints.push([current,i,j])
        }
    }
})

console.log(`Part one = ${risk}`)

let total = 1
let coords = []
let totals = []

lowpoints.forEach(el=>{
    search(el[0], el[1], el[2])
    totals.push(total)
    total = 1
})

totals.sort(function(a, b) {
  return b - a;
});

console.log(`Part two = ${totals[0] * totals[1] * totals[2]}`)

function search(value, y, x){
    let adj = getAdjacent(y,x)
    adj.forEach(ind=>{
        let y = ind[0]
        let x = ind[1]
        let nextNumber = parseInt(data[y][x])
        if(value < nextNumber && nextNumber !==9 ){
            let coord = `${y}-${x}`
            if(coords.indexOf(coord)==-1){
                total+=1
                coords.push(`${y}-${x}`)
            }
            search(nextNumber,y,x)
        }
    })

}