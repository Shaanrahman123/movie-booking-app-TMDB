
// dark and light theme toggler


const modeBtn = document.getElementById('checkbox');
modeBtn.onchange = (e) => {
    if (modeBtn.checked === true) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        window.localStorage.setItem('checkbox', 'dark');
    } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
        window.localStorage.setItem('checkbox', 'light');
    }
}

const mode = window.localStorage.getItem('checkbox');
if (mode == 'dark') {
    modeBtn.checked = true;
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
}

if (mode == 'light') {
    modeBtn.checked = false;
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
}



// dark and light theme toggler


const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=732226ccd502e9fe6b05962474129645'
const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=732226ccd502e9fe6b05962474129645&page=2'
const API_URL_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=732226ccd502e9fe6b05962474129645'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=732226ccd502e9fe6b05962474129645&query="'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=732226ccd502e9fe6b05962474129645';

const main = document.getElementById('main')
const popularmovielist = document.getElementById('popular')
const topRatedMovielist = document.getElementById('topRated')
const form = document.getElementById('form')
const search = document.getElementById('search')


// 88888888888888888888888888888888888888888888  genres area  888888888888888888888888888888888888888888

const genElement = document.getElementById("genre-element");

var selectedGenre = [];
setGenre();
function setGenre() {
    genElement.innerHTML = '';

    fetch(BASE_URL + '/genre/movie/list?' + API_KEY)
        .then(res => res.json())
        .then(({ genres }) => {
            console.log(genres)
            genres.forEach(genre => {
                const genrebox = document.createElement('div');
                genrebox.classList.add('genre-element');
                genrebox.id = genre.id;
                // console.log(genre.id);
                genrebox.innerText = genre.name;

                genrebox.addEventListener('click', () => {
                    if (selectedGenre.length == 0) {
                        selectedGenre.push(genre.id);
                    } else {
                        if (selectedGenre.includes(genre.id)) {
                            selectedGenre.forEach((id, idx) => {
                                if (id == genre.id) {
                                    selectedGenre.splice(idx, 1);
                                }
                            })
                        } else {
                            selectedGenre.push(genre.id);
                        }
                    }
                    getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
                    highlightSelection()
                })

                genElement.append(genrebox);
            })
        })
}

// ********************************* Highlight the selection ********************************


function highlightSelection() {

    const tags = document.querySelectorAll('.genre-element');
    tags.forEach(tag => {
        tag.classList.remove('genre_background_active')
    })
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('genre_background_active');
        })
    }

}


// ********************************* Highlight the selection ********************************


// 8888888888888888888888888888  open the genre part   8888888888888888888888888888888888888


function openGenre() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeGenre() {
    document.getElementById("mySidenav").style.width = "0";
}

document.querySelector('#openbtn-genre').addEventListener('click', function () {
    if (document.getElementById("mySidenav").style.width === "0px") {
        openGenre();
    } else {
        closeGenre();
    }
});
function closeGenreOnBodyClick(event) {
    if (!event.target.closest('#mySidenav') && !event.target.closest('#openbtn-genre')) {
        closeGenre();
    }
}
document.body.addEventListener('click', closeGenreOnBodyClick);
document.querySelector('.closebtn-genre').addEventListener('click', closeGenre)




// 8888888888888888888888888888  open the genre part   8888888888888888888888888888888888888


// 88888888888888888888888888888888888888888888  genres area  888888888888888888888888888888888888888888



// 88888888888888888888888    Fetch movie and show on main page  8888888888888888888888888888888888888


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data)
    showMovies(data.results)
}

getMovies(API_URL);

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, original_language, id } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <div id="${id}">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
                <div class ="rating_lang">
                <span>${vote_average}</span>
                <span >${original_language}</span></div>
                
            </div>
        </div>
        `
        main.appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            openNav(movie);
        })
    })
}




// 8888888888888888888    Fetch movie and show on main page  88888888888888888888888






// 8888888888888888888    Fetch movie and show on top rated 88888888888888888888888


getMoviesTopRated(API_URL_TOP_RATED);


async function getMoviesTopRated(topratedURL) {
    const top = await fetch(topratedURL)
    const toprated = await top.json()
    // console.log(toprated.results)
    showMoviesTopRated(toprated.results)
}


function showMoviesTopRated(toprated) {
    topRatedMovielist.innerHTML = '';

    toprated.forEach(topRatedMovie => {
        const { title, poster_path, vote_average, original_language, id } = topRatedMovie

        const top_rated_movie = document.createElement('div')
        top_rated_movie.classList.add('movie')

        top_rated_movie.innerHTML = `
        <div id="${id}">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
                <div class ="rating_lang">
                <span>${vote_average}</span>
                <span >${original_language}</span></div>
                
            </div>
        </div>
        `
        topRatedMovielist.appendChild(top_rated_movie);

        document.getElementById(id).addEventListener('click', () => {
            openNav(topRatedMovie);
        })
    })
}






// 8888888888888888888    Fetch movie and show on Top rated 88888888888888888888888




// 8888888888888888888    Fetch movie and show on most popular 88888888888888888888888



async function getMoviesPopular(Popularurl) {
    const pop = await fetch(Popularurl)
    const popular = await pop.json()
    showMoviesPopular(popular.results)
}

getMoviesPopular(API_URL_POPULAR);

function showMoviesPopular(popular) {
    popularmovielist.innerHTML = '';

    popular.forEach(popularMovie => {
        const { title, poster_path, vote_average, original_language, id } = popularMovie

        const pop_movie_ele = document.createElement('div')
        pop_movie_ele.classList.add('movie')

        pop_movie_ele.innerHTML = `
        <div id="${id}">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
                <div class ="rating_lang">
                <span>${vote_average}</span>
                <span >${original_language}</span></div>
                
            </div>
        </div>
        `
        popularmovielist.appendChild(pop_movie_ele);

        document.getElementById(id).addEventListener('click', () => {
            openNav(popularMovie);
        })
    })
}



// 8888888888888888888    Fetch movie and show on most popular 88888888888888888888888








// 8888888888888888888    get movie details area  88888888888888888888888

// for now playing 


const detailsofmovie = document.getElementById("movie_details")

function openNav(movie) {
    detailsofmovie.innerHTML = '';
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
        .then(res => res.json())
        .then(({ title, overview, poster_path, original_language, vote_average, runtime, genres }) => {


            let genreName = [];
            for (let i = 0; i < genres.length; i++) {
                genreName.push(genres[i].name + " ");
            }


            const movieDetails = document.createElement('div');
            let price = Math.floor(Math.random() * (300 - 250 + 1) + 250);

            movieDetails.classList.add('main_card');
            movieDetails.innerHTML = ` 
            
                <div class="card_left">
                <div class="card_datails">
                    <h1 id="details-movie-title">${title}</h1>
                    <div class="card_cat">
                        <p class="rating">${vote_average}</p>
                        <p class="language">${original_language}</p>
                    </div>
                    <div class="card_cat">
    
                        <p class="genre">${[...genreName]}</p>
                        <p class="time">${runtime}<span>&nbspMin</span></p>
                    </div>
                    <p class="disc">${overview}</p>
                <div class="social-btn">
                    <p id="ticket-price"><span id="price">₹&nbsp${price}</span></p>
                    <button id="buy-button">
                         Book Now
                    </button>
                </div>	
                </div>
            </div>
            <div class="card_right">
                <div class="img_container">
                    <img src="${IMG_PATH + poster_path}" alt="">
                    </div>
                </div>
            </div>
             
                `
            detailsofmovie.appendChild(movieDetails);

            document.getElementById("buy-button").addEventListener("click", function () {
                window.location.href = `checkout.html?price=${price}&title=${title}`;
            });
        })



    document.getElementById("myNav").style.height = "100%";
}

// for popular movies



function openNav(popularMovie) {
    detailsofmovie.innerHTML = '';
    let id = popularMovie.id;
    fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
        .then(res => res.json())
        .then(({ title, overview, poster_path, original_language, vote_average, runtime, genres }) => {

            let genreName = [];
            for (let i = 0; i < genres.length; i++) {
                genreName.push(genres[i].name + " ");
            }
            const movieDetails = document.createElement('div');

            let price = Math.floor(Math.random() * (300 - 250 + 1) + 250);

            movieDetails.classList.add('main_card');
            movieDetails.innerHTML = ` 
            
                <div class="card_left">
                <div class="card_datails">
                    <h1 id="details-movie-title">${title}</h1>
                    <div class="card_cat">
                        <p class="rating">${vote_average}</p>
                        <p class="language">${original_language}</p>
                    </div>
                    <div class="card_cat">
    
                        <p class="genre">${genreName}</p>
                        <p class="time">${runtime}<span>&nbspMin</span></p>
                    </div>
                    <p class="disc">${overview}</p>
                <div class="social-btn">
                    <p id="ticket-price"><span id="price">₹&nbsp${price}</span></p>
                    <button id="buy-button">
                         Book Now
                    </button>
                </div>	
                </div>
            </div>
            <div class="card_right">
                <div class="img_container">
                    <img src="${IMG_PATH + poster_path}" alt="">
                    </div>
                </div>
            </div>
             
                `
            detailsofmovie.appendChild(movieDetails);

            document.getElementById("buy-button").addEventListener("click", function () {
                window.location.href = `checkout.html?price=${price}&title=${title}`;
            });
        })



    document.getElementById("myNav").style.height = "100%";
}



// for top rated


function openNav(topRatedMovie) {
    detailsofmovie.innerHTML = '';
    let id = topRatedMovie.id;
    fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
        .then(res => res.json())
        .then(({ title, overview, poster_path, original_language, vote_average, runtime, genres }) => {

            let genreName = [];
            for (let i = 0; i < genres.length; i++) {
                genreName.push(genres[i].name + " ");
            }
            const movieDetails = document.createElement('div');

            let price = Math.floor(Math.random() * (300 - 250 + 1) + 250);

            movieDetails.classList.add('main_card');
            movieDetails.innerHTML = ` 
            
                <div class="card_left">
                <div class="card_datails">
                    <h1 id="details-movie-title">${title}</h1>
                    <div class="card_cat">
                        <p class="rating">${vote_average}</p>
                        <p class="language">${original_language}</p>
                    </div>
                    <div class="card_cat">
    
                        <p class="genre">${genreName}</p>
                        <p class="time">${runtime}<span>&nbspMin</span></p>
                    </div>
                    <p class="disc">${overview}</p>
                <div class="social-btn">
                    <p id="ticket-price"><span id="price">₹&nbsp${price}</span></p>
                    <button id="buy-button">
                         Book Now
                    </button>
                </div>	
                </div>
            </div>
            <div class="card_right">
                <div class="img_container">
                    <img src="${IMG_PATH + poster_path}" alt="">
                    </div>
                </div>
            </div>
             
                `
            detailsofmovie.appendChild(movieDetails);

            document.getElementById("buy-button").addEventListener("click", function () {
                window.location.href = `checkout.html?price=${price}&title=${title}`;
            });
        })



    document.getElementById("myNav").style.height = "100%";
}



function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

document.querySelector('.closebtn2').addEventListener('click', closeNav)



// 8888888888888888888    get movie details area  88888888888888888888888





// 8888888888888888888    Searching the movie with debounce function  88888888888888888888888



const debounce = (func, wait, immediate) => {
    let timeout;

    return (...args) => {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (immediate && !timeout) func(...args);
    };
};



const x = document.getElementById("playing-hide");

document.querySelector('#search').addEventListener('input', debounce((e) => {
    const searchTerm = search.value;
    // e.preventDefault()

    if (searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        document.getElementById('topRated').style.display = 'none';
        document.getElementById('popular').style.display = 'none';
        document.getElementById('toprated-hide').style.display = 'none';
        document.getElementById('home-banner').style.display = 'none';
        x.innerText = 'Search Results'
        document.getElementById('popular-hide').style.display = 'none';

    }
    var specialChar = /[!@#$%^&*]/;
    if (specialChar.test(searchTerm)) {
        // getMovies(SEARCH_API + searchTerm);
        document.getElementById('topRated').style.display = 'none';
        document.getElementById('popular').style.display = 'none';
        document.getElementById('toprated-hide').style.display = 'none';
        document.getElementById('home-banner').style.display = 'none';
        x.innerText = 'Enter a valid movie name'
        document.getElementById('popular-hide').style.display = 'none';

    }
    else if (searchTerm == '') {
        getMovies(API_URL)
        document.getElementById('topRated').style.display = 'flex';
        document.getElementById('popular').style.display = 'flex';
        document.getElementById('toprated-hide').style.display = 'flex';
        x.innerText = 'Now Playing';
        document.getElementById('home-banner').style.display = 'block';
        document.getElementById('popular-hide').style.display = 'block';
    }
    console.log(search.value);
}, 600))


// 8888888888888888888    Searching the movie with debounce function 88888888888888888888888



