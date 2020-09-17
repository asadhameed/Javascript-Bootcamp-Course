#!c:/nodejs/node


const Runner = require('./runner');
const testFiles = [];
const runer= new Runner();

const run=async()=>{
    await runer.collectFiles(process.cwd());
    runer.runTests()
  
}
run();

