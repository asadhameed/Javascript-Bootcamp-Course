const durationInput = document.querySelector("#duration")
const start = document.querySelector("#start")
const pause= document.querySelector("#pause")
const circle=document.querySelector('circle')
const perimeter= circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter)
let duration;
const timer= new Timer(durationInput,start,pause, {
    onStart(totalduration){
       duration=totalduration;
    },
    ontick(time){ 
        //offset= (perimeter * time) / (duration - perimeter)
         console.log(`perimeter:${perimeter}  time:${time},  duration:${duration}  offset:${(perimeter * time) / duration - perimeter} `)
        
        circle.setAttribute('stroke-dashoffset',(perimeter * time) / duration - perimeter);
     //   currectOffset = currectOffset - 1;
        console.log("tick tock")
    },
    onComplate(){
        console.log('The time is completed')
    }
});


//timer.start();





