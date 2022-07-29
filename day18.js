const fs = require('fs');
const read = fs.readFileSync("input.txt")
let data = read.toString().split("\r\n")
          .map(el=>JSON.parse(el))


String.prototype.replaceBetween = function(start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};

const day18 = {
   additive:[],
   partTwoRes:0,
   partOne: function(){
      this.parseDataPartOne()
      console.log('Part one = ' + this.getMagnitude())
   },

   partTwo: function(){
      this.parseDataPartTwo()
      console.log("Part two = " + this.partTwoRes)
   },

   parseDataPartOne: function(){
    for(let i=0; i<data.length; i++){
      if(i==0){
        this.additive.push(data[i],data[i+1])
        let next = this.processData(JSON.stringify(this.additive))
        this.additive = JSON.parse(next)
        i++
      }else if(i==data.length){
        let prev = [this.additive, data[i-1]]
        let next = this.processData(JSON.stringify(prev))
        this.additive = JSON.parse(next)
      }else{
        let prev = [this.additive, data[i]]
        let next = this.processData(JSON.stringify(prev))
        this.additive= JSON.parse(next)
    
      }
    }
   },
   
   parseDataPartTwo: function(){
    let vm = this
    function combinations(numArr, choose, callback) {
      var n = numArr.length;
      var c = [];
      var inner = function(start, choose_) {
          if (choose_ == 0) {
              callback(c);
          } else {
              for (var i = start; i <= n - choose_; ++i) {
                  c.push(numArr[i]);
                  inner(i + 1, choose_ - 1);
                  c.pop();
              }
          }
      }
      inner(0, choose);
    }
    combinations(
      data, 2,
      function output(arr) {
        vm.additive = []
        for(let i=0; i<arr.length; i++){
          if(i==0){
            vm.additive.push(arr[i],arr[i+1])
            let next = vm.processData(JSON.stringify(vm.additive))
            vm.additive = JSON.parse(next)
            i++
          }
        }
        let magnitude = vm.getMagnitude(vm.additive)
        vm.partTwoRes =  vm.partTwoRes < magnitude ? magnitude : vm.partTwoRes

        vm.additive = []
        let reversed = [...arr].reverse()
        for(let i=0; i<reversed.length; i++){
          if(i==0){
            vm.additive.push(reversed[i],reversed[i+1])
            let next = vm.processData(JSON.stringify(vm.additive))
            vm.additive = JSON.parse(next)
            i++
          }
        }
        magnitude = vm.getMagnitude(vm.additive)
        vm.partTwoRes =  vm.partTwoRes < magnitude ? magnitude : vm.partTwoRes
      });
    
   },

   processData: function(string){
    let reduced = false
    while(!reduced){
      let depth = 0
      let canExplode = false
      let canSplit = false
  
      // We first look for explode
      for(let i=0; i<string.length;i++){
        string[i]=="[" ? depth++ : string[i]=="]" ? depth-- : undefined
        if(depth==5){
          canExplode = true
          let indexOfVirgule = string.indexOf(',', i)
          let indexOfLastCrochet = string.indexOf(']', indexOfVirgule)
          let leftVal = parseInt(string.slice(i+1, indexOfVirgule))
          let rightVal = parseInt(string.slice(indexOfVirgule+1, indexOfLastCrochet))
  
          let leftNumber = this.lookForPrevNumber(string.slice(0,i), "left" , 0)
          let updatedStringLeft 
          let additiveLeft = 1
  
          if(leftNumber){
            additiveLeft = leftNumber[2] + leftVal
            updatedStringLeft = string.replaceBetween(leftNumber[0],leftNumber[1]+1, additiveLeft)
          }else{
            updatedStringLeft = string
          }
          
          let add = additiveLeft.toString().length - 1
  
          if(leftNumber && additiveLeft.toString().length == leftNumber[2].toString().length){
              add = 0
          }
  
          let rightNumber = this.lookForPrevNumber(updatedStringLeft.slice(indexOfLastCrochet+add), "right" , indexOfLastCrochet+add)
          let updatedStringRight
          let additiveRight = 1
          if(rightNumber){
            additiveRight = rightNumber[2] + rightVal 
            updatedStringRight = updatedStringLeft.replaceBetween(rightNumber[0],rightNumber[1]+1, additiveRight)
          }else{
            updatedStringRight = updatedStringLeft
          }
          
          let updatedString = updatedStringRight.replaceBetween(i+add, indexOfLastCrochet+1+add, "0")
          string = updatedString
          break
        }
      }
  
      // If we didn't find any explode, we look for split
      if(!canExplode){
        let reg = /\b[0-9]{2,4}\b/
        let match = reg.exec(string)
        if(match){
          canSplit = true
          let indexStart = match.index 
          let indexEnd = match.index + match[0].length 
          let number = parseInt(string.slice(indexStart, indexEnd))
          let leftVal = Math.floor(number/2)
          let rightVal = Math.ceil(number/2)
          let updatedString = string.replaceBetween(indexStart, indexEnd, `[${leftVal},${rightVal}]`)
          string = updatedString
        }
      }
  
      // If none of explode or split happened, we reduced the number
      if(!canExplode && !canSplit){
        reduced = true
        return string
      }
    }
   },

   lookForPrevNumber: function (string, dir, ind){
      let reg =  /\d+/g
      let match
      let startIndex 
      let endIndex
      let number 
      let res = false
      if(dir=="left"){
        while(match = reg.exec(string)){
          number = parseInt(match[0])
          startIndex = match.index 
          endIndex = match.index + match[0].length - 1
          res = true
      }
      }else{
        match = reg.exec(string)
        if(match){
          number = parseInt(match[0])
          startIndex = match.index 
          endIndex = match.index + match[0].length - 1
          res = true
        }
      }
      
      return res ? [startIndex+ind, endIndex+ind, number ] : false
    },

    magnitude: function(arr){
      return arr.map( (el)=> {
        if(Array.isArray(el) && !Array.isArray(el[0]) && !Array.isArray(el[1])){
          let res = el[0]*3 + el[1]*2
          return res
        }else if(Array.isArray(el) && (Array.isArray(el[0]) || Array.isArray(el[1])) ){
          return this.magnitude(el)
        }else{
          return el
        }
      })
    },

    getMagnitude: function(){
      let arr = this.additive
      while(isNaN(arr.reduce((a,b) => a+b))){
          arr = this.magnitude(arr)
      }
      return arr.reduce((a,b) => a*3 + b*2)
    }
    
}

day18.partOne()
day18.partTwo()

