const debounce =(fun,delay=1000)=>{
    let timeoutId;
    return(arg)=> {
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        timeoutId =setTimeout(()=>{
            fun(arg)
        },delay)
    };

};
