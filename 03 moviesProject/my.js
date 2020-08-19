
createAutoComplete({
    root:document.querySelector(".autocomplete-left"),
    side:document.querySelector(".left"),
    renderOption(movie){
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src='${srcImg}' /> ${movie.Title}  `;
    },
    onOptioinSelect(movie,side){
        onMovieSelected(movie,side);
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
    
});

createAutoComplete({
    root:document.querySelector(".autocomplete-right"),
    side:document.querySelector(".right"),
    renderOption(movie){
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src='${srcImg}' /> ${movie.Title}  `;
    },
    onOptioinSelect(movie,side){
        onMovieSelected(movie,side);
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
    
});

const onMovieSelected = async (movie,side) => {
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: 'dd42bc24',
            i: movie.imdbID 
        }
    });
    console.log(response.data);
    side.querySelector('.summery').innerHTML=moiveTemplate(response.data)
};

const moiveTemplate= (movieDetial)=>{

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

        <article class="notification is-primary">
            <p class="title">Awards </p>
            <p class="Subtitle"> ${movieDetial.Awards}</p>
        </article>
        <article class="notification is-primary">
            <p class="title">Box Office </p>
            <p class="Subtitle"> ${movieDetial.BoxOffice}</p>
        </article>
        <article class="notification is-primary">
            <p class="title">Metascore </p>
            <p class="Subtitle"> ${movieDetial.Metascore}</p>
        </article>
        <article class="notification is-primary">
            <p class="title">IMDB Rating </p>
            <p class="Subtitle"> ${movieDetial.imdbRating}</p>
        </article>
    `;

}