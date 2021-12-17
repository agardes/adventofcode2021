let targetX = {min:195,max:238}
let targetY = {min:-93,max:-67}

const day17 = {
    higherY:0,
    partTwo:[],
    run(){
        for(let x=1;x<1000;x++){
            for(let y=-1000;y<1000;y++){
                let k = this.fly(x,y)
                if(k){
                    this.partTwo.push([x,y])
                }
                
            }
        }
        console.log(`Part one = ` + this.higherY)
        console.log(`Part two = ` +this.partTwo.length)
    },
    fly(velX,velY){
        let flying = true
        let higher = 0
        let currentX = 0 
        let currentY = 0 
        while(flying){
            currentX+=velX
            currentY+=velY
            higher = currentY > higher ? currentY : higher
            velX > 0 ? velX-=1 : velX < 0 ? velX+=1 : 0
            velY-=1
            if(currentX>=targetX.min && currentX<=targetX.max && currentY>=targetY.min && currentY<=targetY.max){
                flying=false
                this.higherY = higher > this.higherY ? higher : this.higherY
                return true
            }else if(currentX>targetX.max || currentY<targetY.min){
                flying = false
                return false
            }
        }
    }
}

day17.run()
