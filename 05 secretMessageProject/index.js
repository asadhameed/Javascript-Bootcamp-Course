
const {hash}=window.location;
if(hash){
    
    document.querySelector("#message-form").classList.add('hide');
    document.querySelector("#message-show").classList.remove('hide');
    document.querySelector('h1').innerText=atob(hash.replace('#', ''))
}


document.querySelector('form').addEventListener('submit', event=>{
    event.preventDefault();
  
    document.querySelector("#message-form").classList.add('hide');
    document.querySelector("#link-form").classList.remove('hide');
    const input=document.querySelector('#message-input');

    const link=document.querySelector('#link-input');
    const en= btoa(input.value);
    link.value = `${window.location}#${en}`
   
    
    link.select();
    console.log(input.value)
});