class Timer{

    constructor(durationInput,startTimer, pauseTimer,callbacks){
        this.durationInput=durationInput;
        this.startTimer=startTimer;
        this.pauseTimer=pauseTimer;
        if(callbacks){
            this.onStart=callbacks.onStart;
            this.ontick=callbacks.ontick;
            this.onComplate=callbacks.onComplate;
        }
        this.startTimer.addEventListener('click',this.start)
        this.pauseTimer.addEventListener('click',this.pause)
        this.durationInput.addEventListener('change', this.duration)
    }

    start=()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval=setInterval(this.tick, 50);
    }

    tick=()=>{
        if(this.timeRemaining<=0){
            
            this.pause();
            if(this.onComplate){
                this.onComplate()
            }
        }
        else
        {
           
            this.timeRemaining=this.timeRemaining -  0.05;
            if(this.ontick){
                this.ontick(this.timeRemaining)
            }
        }

        
    }

    get timeRemaining(){
      return   parseFloat(this.durationInput.value);
    }

    set timeRemaining(time)
    {
        durationInput.value=time.toFixed(2)

    }
    
    pause=()=>{
        if(this.onStop){
            this.onStop();
        }
        clearInterval(this.interval)
    }

    duration=()=>{
        this.changeDuration=this.timeRemaining;
       // console.log(`the valaue is change ${this.changeDuration}`)
    }
}