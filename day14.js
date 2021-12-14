const fs = require('fs');
const read = fs.readFileSync("input.txt");
let template
let pairs = []
read.toString().split("\r\n").forEach((el,i)=>{
    if(i==0){
        template = el
    }else if(el!==""){
        pairs.push(el.split(' -> '))
    }
})
const day14 = {
    step:0,
    flashes:0,
    totalStep:10,
    run: function(part){
        while(this.totalStep>this.step){
            this.step++
            let newTemplate = template
            let indexes = []
            
            pairs.forEach(el=>{
                const toFind = [el[0]]
                const index = (str, item, i = 0) => {
                    const idx = str.indexOf(item, i);
                    return idx >= 0 ? [[item, idx], ...index(str, item, idx+1)] : []
                  }
                  const getIndexPairs = (source, toFind) =>
                    toFind.flatMap(item => index(source, item)).sort(([,a], [,b])=>a-b);
                    
                  getIndexPairs(template, toFind).forEach(([item, index]) => {
                    indexes.push([index+1, el[1]])
                  });

            })
            newTemplate = newTemplate.split('')
            let inc = 0 
            indexes.sort(function(a, b) { return a[0] - b[0]; });
            indexes.forEach(el=>{
                newTemplate.splice(el[0]+inc, 0, el[1])
                inc++
            })
            template = newTemplate.join('')
            // console.log([...template].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}))
        }
        let counts = [...template].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {})
        let arr = Object.entries(counts).map(el=>el[1])
        let max = Math.max(...arr)
        let min = Math.min(...arr)
        let res = max-min
        console.log('Part one = ' + res)
    },

}
day14.run('one')

// day11.run('two')