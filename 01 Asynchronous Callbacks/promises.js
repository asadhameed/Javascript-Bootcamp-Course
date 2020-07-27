
const btn = document.querySelector('input')

/**
 * this is the same like call back with success and failure 
 * but this time i will implemented with promise
 * @param {} element 
 * @param {*} amount  how much move the elemect on px
 * @param {*} delay   time of delay
 */
const moveX = (element, amount, delay)=>{ 
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const currentLeft= element.getBoundingClientRect().left;
            const right =element.getBoundingClientRect().right;
            const boundry= document.body.clientWidth;
            if(right+amount > boundry ){
                reject();
            }
            else{
                element.style.transform=`translateX(${currentLeft+amount}px)`
            resolve();
            }
        },delay);
    })   
}

// moveX(btn , 200,1000)
// .then(()=>{
//     console.log('move on x Successfully')
//     return moveX(btn,200,1000);
// })
// .then(()=>{
//     console.log('move on x Successfully')
//     return moveX(btn,200,1000);
// })
// .then(()=>{
//     console.log('move till the end Successfully')
// })
// .catch(()=>{
//     console.log('Out of space , cannot move')
// })



// moveX(btn , 200,1000)
// .then(()=>{
//     return moveX(btn,200,1000);
// })
// .then(()=>{
//     return moveX(btn,200,1000);
// })
// .then(()=>{
//     console.log('move till the end Successfully')
// })
// .catch(()=>{
//     console.log('Out of space , cannot move')
// })

// the upper comment section can also written in the following way
// if there is one line in the retrun then do not return just we can write on the follwing way
moveX(btn ,100,1000)
.then(()=> moveX(btn ,100,1000))
.then(()=> moveX(btn ,100,1000))
.then(()=> moveX(btn ,100,1000))
.then(()=> moveX(btn ,100,1000))
.then(()=> moveX(btn ,100,1000))
.then(()=> console.log('Move till then end'))
.catch(()=>  console.log('Out of space , cannot move'))

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


//  const moveX = (element, amount, delay,onSuccess, onFailure)=>{    
//         setTimeout(()=>{
//             const currentLeft= element.getBoundingClientRect().left;
//             const right =element.getBoundingClientRect().right;
//             const boundry= document.body.clientWidth;
//             if(right+amount > boundry ){
//                onFailure();
//             }
//             else{
//                 element.style.transform=`translateX(${currentLeft+amount}px)`
//             //if(callback)
//             onSuccess();
//             }
//         },delay);
    
//  }

//  moveX(btn, 100, 1000 ,
//     ()=>{moveX(btn,100,1000, 
//         ()=>{moveX(btn , 100, 1000, 
//             ()=>{moveX(btn , 100, 1000, 
//                 ()=>{ moveX(btn, 100, 1000, 
//                     ()=>{moveX(btn, 100, 1000,
//                         ()=>{moveX(btn, 100, 1000,
//                             ()=>{alert('Window is so big')},
//                             ()=>{alert('can not move anymore')})},
//                     ()=>{alert('can not move anymore')})},
//                 ()=>{alert('can not move anymore')})},
//             ()=>{alert('can not move anymore')})},
//         ()=>{alert('can not move anymore')})},
//     ()=>{alert('can not move anymore')})}, 
// ()=>{alert('can not move anymore')});

