
const btn = document.querySelector('input')

// setTimeout(()=>{
//     btn.style.transform='translateX(100px)';
//     setTimeout(()=>{
//         btn.style.transform='translateX(200px)'
//         setTimeout(()=>{
//             btn.style.transform='translateX(300px)'
//             setTimeout(()=>{
//                 btn.style.transform='translateX(400px)'
//                 setTimeout(()=>{
//                     btn.style.transform='translateX(500px)'
//                 },1000);
//             },1000);
//         },1000);
//     },1000);
// },1000);


 const moveX = (element, amount, delay,onSuccess, onFailure)=>{    
        setTimeout(()=>{
            const currentLeft= element.getBoundingClientRect().left;
            const right =element.getBoundingClientRect().right;
            const boundry= document.body.clientWidth;
            if(right+amount > boundry ){
               onFailure();
            }
            else{
                element.style.transform=`translateX(${currentLeft+amount}px)`
            //if(callback)
            onSuccess();
            }
        },delay);
    
 }

 moveX(btn, 100, 1000 ,
    ()=>{moveX(btn,100,1000, 
        ()=>{moveX(btn , 100, 1000, 
            ()=>{moveX(btn , 100, 1000, 
                ()=>{ moveX(btn, 100, 1000, 
                    ()=>{moveX(btn, 100, 1000,
                        ()=>{moveX(btn, 100, 1000,
                            ()=>{alert('Window is so big')},
                            ()=>{alert('can not move anymore')})},
                    ()=>{alert('can not move anymore')})},
                ()=>{alert('can not move anymore')})},
            ()=>{alert('can not move anymore')})},
        ()=>{alert('can not move anymore')})},
    ()=>{alert('can not move anymore')})}, 
()=>{alert('can not move anymore')});

