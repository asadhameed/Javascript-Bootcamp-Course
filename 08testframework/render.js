const jsdom= require('jsdom');
const path = require('path')
const {JSDOM}=jsdom;

const render=async (fileName)=>{
    const filePath = path.join(process.cwd(), fileName);
   const dom= await JSDOM.fromFile(filePath,{
        runScripts:'dangerously',
        resources:"usable"
    })
    
   return new Promise((reslove, rejct)=>{
        dom.window.document.addEventListener("DOMContentLoaded", ()=>{
            reslove(dom)
         
        })
    })
   
    //return dom;
}

module.exports = render;