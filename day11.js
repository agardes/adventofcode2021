const fs = require('fs');
const read = fs.readFileSync("input.txt");
const data = read.toString().split("\r\n").map(row=>row.split('').map(Number))
const length = data[0].length

const day11 = {
    step:0,
    flashes:0,
    totalStep:100,
    data:[...data],
    flash: function(y,x,arr){
        this.flashes++
        let adj = this.getAdjacent(y, x)
        adj.forEach(indexes => {
            arr[y][x]=0
            let nextY = indexes[0]
            let nextX = indexes[1]
            if(arr[nextY][nextX]!==0){
                arr[nextY][nextX]+=1
            }
            if(arr[nextY][nextX]>9){
                this.flash(nextY,nextX,arr)
            }
            
        })
        
        
    },
    run: function(part){
        if(part=='two'){
            this.totalStep = Infinity
        }
        while(this.step<this.totalStep){
            this.step++
            this.data = this.data.map(row=> row.map(el=>{
                return el+=1
            }))
            this.data.forEach((row,y,arr) => {
                for(let x=0; x<row.length; x++){
                    if(row[x]>9){
                        this.flash(y,x,arr)
                    }
                }
                
            })

            if(part=='two'){
                if(this.data.flat(1).every( (val, i, arr) => val === arr[0] )){
                    console.log('Part two = ' + this.step)
                    this.step =  this.totalStep
                }
            }
           
           
        }

        if(part=="one"){
            console.log('Part one = ' + this.flashes)
        }
    },
    getAdjacent: function(rowY,nbX){
        let adj = []
        if(rowY!==0){
            adj.push([rowY-1, nbX])
            if(nbX!==length-1){
                adj.push([rowY-1, nbX+1])
            }
            if(nbX!==0){
                adj.push([rowY-1, nbX-1])
            }
        }
        if(rowY!==data.length-1){
            adj.push([rowY+1, nbX])
            if(nbX!==length-1){
                adj.push([rowY+1, nbX+1])
            }
            if(nbX!==0){
                adj.push([rowY+1, nbX-1])
            }
        }
        if(nbX!==0){
            adj.push([rowY, nbX-1])
        }
        if(nbX!==length-1){
            adj.push([rowY, nbX+1])
        }
        return adj
    }
}
day11.run('one')
day11.run('two')