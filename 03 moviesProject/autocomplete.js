const createAutoComplete =({root,side,renderOption,onOptioinSelect,inputValue,fetchData})=>{
    
root.innerHTML = `
    <label><b> Search </b></label>
   <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div> 
    </div>

    <div class="target" ></div>
`;
const input = root.querySelector('input')
const dropdown = root.querySelector('.dropdown')
const resultsWrapper = root.querySelector('.results')
const onInput = async (event) => {

    const notFound = document.querySelector('.notFound');
    if (notFound) {
        notFound.remove()
    }
    //  await   fetchData(event.target.value).then((movies)=>{
    const items = await fetchData(event.target.value)
    resultsWrapper.innerHTML = '';
    if (items.length >= 1) {
        dropdown.classList.add('is-active');
        for (let item of items) {
            
            const options = document.createElement('a');
            options.classList.add('dropdown-item');
            options.innerHTML = renderOption(item);

            // My method to slove the broken image link
            // if(movie.Poster !== 'N/A')
            // options.innerHTML=`<img src='${movie.Poster}' /> `
            // options.innerHTML+= `${movie.Title}  `;


            options.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptioinSelect(item)
            })
            root.querySelector('.dropdown-content').appendChild(options)


        }
    }
    else {
        dropdown.classList.remove('is-active')
        const h1 = document.createElement('h1');
        h1.className = "notFound";
        h1.innerText = "The movie is not found";
        root.querySelector('.target').appendChild(h1);
       // input.value = "";
    }

    // }).catch((error)=>{
    //     console.log('Not found any movies')
    // })
}
input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});



};