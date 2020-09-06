const url=`${window.location}`;

const message=url.split(/\#/);
if(message[1]){
    const div= document.querySelector('.show');
    div.style.display='none';
    const divMessage= document.querySelector('.hidden');
    divMessage.style.display='inline';
    

    const input=document.querySelector('#user-message');
     input.value=atob(message[1]);

}

document.querySelector('#createnewmessage').addEventListener('click',()=>{
    document.querySelector('.show').style.display='inline';
    document.querySelector('.hidden').style.display='none';
    window.location=message[0];
});



document.querySelector('#formcreatemessage').addEventListener('submit', event=>{
    event.preventDefault();
  
    const input=document.querySelector('#message-input');

    const link=document.querySelector('#link-input');
    const en= btoa(input.value);
    link.value = `${window.location}#${en}`
    link.select();
    console.log(input.value)
});