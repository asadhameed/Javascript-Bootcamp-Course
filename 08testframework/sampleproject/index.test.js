const {foreach,map} = require('./index');
const assert= require('assert');
let number;
beforeEach(()=>{
    number=[1,2,3]
})
const runingTest=(description, func)=>{
    try {
        console.log('-----Runing test of' ,description);
        func();
        console.log(description, ' is pass');
    } catch (error) {
        console.log(error.message)
        console.log('*********', description, ' is fialed')
        
    }
}

 it('Test one foreach', ()=>{
     let sum=0;
     foreach(number, (el)=>{
         sum+= el});
         assert.strictEqual(sum,6)
 })

it('test second map',()=>{
    const result = map(number, (el)=>{
        return 2 * el;
    })

    assert.deepStrictEqual(result,[2,4,6])
})