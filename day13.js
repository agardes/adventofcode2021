const fs = require('fs');
const read = fs.readFileSync("input.txt");

let dots = []
let folds = []
let width = 0
let height = 0

read.toString().split("\r\n").forEach(el=>{
    if(el[0]=="f"){
        let fold = el.split('=')
        folds.push([fold[0][fold[0].length-1], parseInt(fold[1])])
    }else if(el!==""){
        let coords = el.split(',').map(Number)
        width = coords[0] > width ? coords[0] : width
        height = coords[1] > height ? coords[1] : height
        dots.push(coords)
    }
})

folds.forEach((el,i,arr) => {
    if(i==1){
        console.log(`Part one = `+dots.length)
    }
    let dir = el[0]
    let pos = el[1]
    if(dir=="y"){
        let btm = dots.filter(coords=>coords[1] > pos).map(coords=>[coords[0],height - coords[1]])
        let top = dots.filter(coords=>coords[1] < pos)
        dots = [... new Set(top.concat(btm).map(e => e.join(',')))].map(e=>e.split(',').map(Number))
        height = pos-1
    }else if(dir=="x"){
        let right = dots.filter(coords=>coords[0] > pos).map(coords=>[width - coords[0],coords[1]])
        let left = dots.filter(coords=>coords[0] < pos)
        dots = [... new Set(left.concat(right).map(e => e.join(',')))].map(e=>e.split(',').map(Number))
        width = pos-1
    }
})

for(let y = 0; y<=height; y++){
    let line = ""
    for(let x=0;x<=width;x++){
        let res = " "
        dots.forEach(coords=>{
            if(coords[0]==x && coords[1]==y){
                res="#"
            }
        })
        line+=res
    }
    console.log(line)
}
