

const expect  = chai.expect;
const forWait = (selecter)=>{

    return new Promise((reslove, reject)=>{
       const interval=  setInterval(()=>{
            if(document.querySelector(selecter)){
                clearInterval(interval)
                clearTimeout(timeout)
                reslove();
                
            }
            

        },100);
       
        const timeout= setTimeout(()=>{
            clearInterval(interval)
            reject();
            
        }, 2000)
    })

}
beforeEach(()=>{
    document.querySelector('#target').innerHTML='';
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
               { Title: "The avengers"},
               { Title: "some avengers"},
               { Title: "no evengers"},
                {Title: "Some movie"}
            ]
        },
        renderOption(movie) {
            return movie.Title;
        }

    })

});


it('testing that dorpdown have class is-active', () => {
    
    const dropdown= document.querySelector('.dropdown');
    expect(dropdown.className).not.be.include('is-active')

})

const inputEvent=async()=>{
    const input= document.querySelector('input');
    input.value='avengers'
    input.dispatchEvent(new Event('input'))

    await forWait('.dropdown-item')
}
it('testing that the dropdown is active', async() => {
     await inputEvent();
    
    const dropdown= document.querySelector('.dropdown');
    expect(dropdown.className).be.include('is-active')
   // expect(input.id).to.equal('asa')

})

it('After searching items, display some result',async()=> {
    await inputEvent();
    
    const items= document.querySelectorAll('.dropdown-item');
    expect(items.length).to.equal(4)
   // expect(input.id).to.equal('asa')

})