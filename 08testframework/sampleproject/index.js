
module.exports={ foreach(arry, func){
    for(let el of arry){
        func(el);
    }
},

 map(arry, func){
    const result=[];
    for(let el of arry){
        result.push(func(el));
    }

    return result

}
}
