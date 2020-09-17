const jsdom =require('jsdom');
const {JSDOM} =jsdom;

const load= async ()=>{
    const dom = await JSDOM.fromFile('./sampleweb/index.html')
    const input =dom.window.document.querySelector('input');
    input.value= "asad@yahoo.com";
     await dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'))
  
     dom.window.document.addEventListener("DOMContentLoaded", ()=>{
       // console.log(dom.window.document.querySelector('h1'))
        console.log('DOne')
        if(dom.window.document.querySelector('h1').textContent==="This is valid email!"){
            console.log(" The mail is correct")
        }
        else{
            console.log(" the email is not correct");
        }
    
    })
    
  
   // return dom;
}

 load();

