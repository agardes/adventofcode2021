const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\n")

let gamma = ''
let epsilon = ''
let positionsZeros = {}

for(let i=0;i<data.length; i++){
    for(let j=0;j<data[0].length;j++){
        if(data[i][j]=="0"){
            positionsZeros[j] ? positionsZeros[j]+=1 : positionsZeros[j] = 1
        }
    }
}

for (const pos in positionsZeros) {
    if(positionsZeros[pos]<(data.length/2)){
        gamma += '1'
        epsilon += '0'
    }else{
        gamma += '0'
        epsilon += '1'
    }
}

console.log(`Part one = ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`)

let oxygen
let co2
partTwo(0, data, 'o2')
partTwo(0, data, 'co2')

function partTwo(index, arr, criteria){
    let zeroes = 0

    arr.forEach(el => {
        el[index] == '0' ? zeroes++ : undefined
    });

    let newArr
    if(zeroes<=arr.length/2){
        newArr = criteria=='o2' ? arr.filter(el=>el[index]=="1") : arr.filter(el=>el[index]=="0")
    }else{
        newArr = criteria=='o2' ? arr.filter(el=>el[index]=="0") : arr.filter(el=>el[index]=="1")
    }
    if(newArr.length==1){
        criteria=='o2' ? oxygen = parseInt(newArr[0],2) : co2 = parseInt(newArr[0],2)
    }else{
        partTwo(index+1,newArr,criteria)  
    }
}

console.log(`Part two = ${oxygen*co2}`)
