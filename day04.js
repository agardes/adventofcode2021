const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let nbList = data.shift().split(',').map(Number)
data.shift()
let players = []
let player = []
let gameTable = []

function Card(value,x,y){
    this.value = value
    this.x = x
    this.y = y
    this.marked = false
}

function Player(cards){
    this.isPlaying = true
    this.cards = cards
    this.checkIfWin = function(){
        function groupBy2(arr, prop) {
            let grouped = {};
            for (let i=0; i<arr.length; i++) {
              let p = arr[i][prop];
              if (!grouped[p]) { grouped[p] = []; }
              grouped[p].push(arr[i]);
            }
            return grouped;
          }

        let marked = this.cards.filter(el=>el.marked==true)

        if(marked.length>=5){
            for(const [key, value] of Object.entries(groupBy2(marked, 'y'))){
                if(value.length>4){
                    return this.cards.filter(el=>el.marked!==true).map(el=>el.value).reduce((a,b)=>a+b)
                }
              }
            for(const [key, value] of Object.entries(groupBy2(marked, 'x'))){
                if(value.length>4){
                    return this.cards.filter(el=>el.marked!==true).map(el=>el.value).reduce((a,b)=>a+b)
                }
              }
        }

        return false
    }

}
function createCardsAndPlayers(){
    // Format input data
    for(let i=0; i<data.length; i++){
        let el = data[i].split(' ').filter(el=>el!=='').map(Number)
        el.length!==0 ? player.push(el) : undefined

        if(data[i]=='' || i==data.length-1){
            players.push(player)
            player = []
        }   
    }
    // Create cards and players
    for(let i=0;i<players.length; i++){
        let setOfCards = []
        for(let y=0;y<players[i].length;y++){
            for(let x=0;x<players[i][y].length;x++){
                let card = new Card(players[i][y][x],x,y)
                setOfCards.push(card)
            }
        }
        let player = new Player(setOfCards)
        gameTable.push(player)
    }
}

createCardsAndPlayers()
let res = []

// Start the game
for(let i=0;i<nbList.length;i++){
    let nb = nbList[i]
    gameTable.every(player=>{
        if(player.isPlaying){
            let f = player.cards.filter(el=>el.value==nb)
            if(f.length!==0){
                f.forEach(el=>el.marked=true)
            }
            let hasWon = player.checkIfWin()
            if(hasWon){
                player.isPlaying = false
                let p = hasWon*nb
                res.push(p)
            }  
        }
        return true
    })
}

console.log(`
Part one = ${res[0]}
Part two = ${res.pop()}
`)
