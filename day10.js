const fs = require('fs');
const read = fs.readFileSync("input.txt");
const data = read.toString().split("\r\n")

let partOne = 0
let corrupted = []
let scores =[]

function day10(data, part){
    data.forEach((line, index)=>{
        let opening = ['{','(','[','<']
        let opened = []
        for(let i=0;i<line.length;i++){
            if(opening.indexOf(line[i])!==-1){
                opened.push(line[i])
            }else{
                switch(line[i]){
                    case ')':
                        if(opened[opened.length-1]=='('){
                            opened.pop()
                        }else{
                            part=='one' ? partOne += 3 : undefined
                            part=='one' ? corrupted.push(index) : undefined
                            part=='one' ? i = line.length : undefined
                        }
                        break
                    case ']':
                        if(opened[opened.length-1]=='['){
                            opened.pop()
                        }else{
                            part=='one' ? partOne += 57 : undefined
                            part=='one' ? corrupted.push(index) : undefined
                            part=='one' ? i = line.length : undefined
                        }
                        break
                    case '}':
                        if(opened[opened.length-1]=='{'){
                            opened.pop()
                        }else{
                            part=='one' ? partOne += 1197 : undefined
                            part=='one' ? corrupted.push(index) : undefined
                            part=='one' ? i = line.length : undefined
                        }
                        break
                    case '>':
                        if(opened[opened.length-1]=='<'){
                            opened.pop()
                        }else{
                            part=='one' ? partOne += 25137 : undefined
                            part=='one' ? corrupted.push(index) : undefined
                            part=='one' ? i = line.length : undefined
                        }
                        break
    
                }
                
            }
        }

        if(part=="two"){
            let toAdd = []
            opened.forEach(char=>{
                char=="[" ? toAdd.unshift(']') : char=="(" ? toAdd.unshift(')') : char=="{" ? toAdd.unshift('}') : toAdd.unshift('>')
            })
            let total = 0
            toAdd.forEach(char=>{
                total *= 5
                char==']' ? total+=2 : char==')' ? total+=1 : char=='}' ? total+=3 : total+=4
            })
            scores.push(total)
        }
        
    })
}

day10(data,'one')
console.log(`Part one = ${partOne}`)
let incomplete = data.filter((el,i) => !corrupted.includes(i))
day10(incomplete, 'two')
console.log(`Part two = ${scores.sort((a,b)=>b-a)[(scores.length-1)/2]}`)
