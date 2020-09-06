const autoCompleteConfig={
    renderOption(movie){
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src='${srcImg}' /> ${movie.Title}  `;
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData (search) {
        const response = await axios.get('http://www.omdbapi.com', {
            params: {
                apikey: 'dd42bc24',
                s: search
            }
        });
        if (response.data.Error) {
            return [];
        }
        return response.data.Search;
    }
}
createAutoComplete({
    ...autoCompleteConfig,
    root:document.querySelector("#left-autocomplete"),
    onOptioinSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelected(movie, document.querySelector("#left-summer"),'left');
    }
});

createAutoComplete({
    ...autoCompleteConfig,
    root:document.querySelector("#right-autocomplete"),
    onOptioinSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelected(movie, document.querySelector("#right-summer"),'right');
    }
});
let leftSideMoive;
let rightSideMoive;
const onMovieSelected = async (movie,summeryElemnt,side) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: 'dd42bc24',
            i: movie.imdbID 
        }
    });
    if(side==='left'){
        leftSideMoive=response.data;
    }
    else{
        rightSideMoive=response.data;
    }

  
    console.log(response.data);
    summeryElemnt.innerHTML=moiveTemplate(response.data)

    if( rightSideMoive && leftSideMoive){
        runComparsion()
    }
};
const runComparsion=()=>{
    const leftSideStat= document.querySelectorAll('#left-summer .notification');
    const rightSideStat= document.querySelectorAll('#right-summer .notification');
    console.log(leftSideStat)
    console.log(rightSideStat)

    leftSideStat.forEach((leftStat,index) => {
        const rightStat=rightSideStat[index];

        const rightSideValue=rightStat.dataset.value ;
        const leftsideValue=leftStat.dataset.value;
        if(rightSideValue > leftsideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add()
        }
        else{
            rightStat.classList.remove('is-primary');
        }
        //console.log(leftStat.dataset.value +   "   "+ rightStat.dataset.value )
    });
}

const moiveTemplate= (movieDetial)=>{

    const dollor = parseInt(movieDetial.BoxOffice.replace(/\$/g, '').replace(/,/g,''));
    const metaScore =parseInt(movieDetial.Metascore);
    const rating = parseFloat(movieDetial.imdbRating);
    const awards=movieDetial.Awards.split(' ').reduce((prv, word)=>{
        const value=parseInt(word);
        if(isNaN(value)){
            return prv;
        }
        else{
            return prv+value;
        }

    },0);
    console.log(awards);
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src='${movieDetial.Poster}' />
                </p>
            </figure>
            <div class "media-content">
                <div class="content">
                    <h1> ${movieDetial.Title} </h1>
                    <h4> ${movieDetial.Genre} </h4>
                    <br>
                    <p> ${movieDetial.Plot}
                </div>
            </div>
        </article>

        <article data-value=${awards} class="notification is-primary">
            <p class="title">Awards </p>
            <p class="Subtitle"> ${movieDetial.Awards}</p>
        </article>
        <article data-value=${dollor} class="notification is-primary">
            <p class="title">Box Office </p>
            <p class="Subtitle"> ${movieDetial.BoxOffice}</p>
        </article>
        <article data-value=${metaScore} class="notification is-primary">
            <p class="title">Metascore </p>
            <p class="Subtitle"> ${movieDetial.Metascore}</p>
        </article>
        <article data-value=${rating} class="notification is-primary">
            <p class="title">IMDB Rating </p>
            <p class="Subtitle"> ${movieDetial.imdbRating}</p>
        </article>
    `;

}