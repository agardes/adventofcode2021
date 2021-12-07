const fs = require('fs');
const read = fs.readFileSync("input.txt");
const data = read.toString().split(",").map(Number)
let minFuel = Infinity


const day07 = {
    incFuel: function(val){
        let res = 0
        for(let i=1;i<=val;i++){
            res+=i
        }
        return res
    },
    iterate: function(value, part){
        let currentFuel = 0
        for(let i=0;i<data.length;i++){
            currentFuel += part=='one' ? Math.abs(value-data[i]) : this.incFuel(Math.abs(value-data[i]))
            if(currentFuel>minFuel){
                i = data.length
                return false
            }
        }
        minFuel = currentFuel
        return minFuel
    },
    run: function(part){
        minFuel = Infinity
        let min = Math.min(...data)
        let max = Math.max(...data)
        let result

        for(let i=min;i<=max;i++){
            let res = this.iterate(i, part)
            if(res){
                result = res
            }
        }
        console.log(`Part ${part} = ${result}`)
    }

}

day07.run('one')
day07.run('two')
