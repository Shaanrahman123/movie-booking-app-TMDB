
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
const selectedGenre = [];

setGenre();

async function setGenre() {
    genElement.innerHTML = '';

    try {
        const response = await fetch(BASE_URL + '/genre/movie/list?' + API_KEY);
        const { genres } = await response.json();

        genres.forEach(genre => {
            const genrebox = document.createElement('div');
            genrebox.classList.add('genre-element');
            genrebox.id = genre.id;
            genrebox.innerText = genre.name;

            genrebox.addEventListener('click', () => {
                if (selectedGenre.length === 0) {
                    selectedGenre.push(genre.id);
                } else {
                    if (selectedGenre.includes(genre.id)) {
                        selectedGenre.forEach((id, idx) => {
                            if (id === genre.id) {
                                selectedGenre.splice(idx, 1);
                            }
                        });
                    } else {
                        selectedGenre.push(genre.id);
                    }
                }
                fetchAndShowMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')), main);
                fetchAndShowMovies(API_URL_TOP_RATED + '&with_genres=' + encodeURI(selectedGenre.join(',')), topRatedMovielist);
                fetchAndShowMovies(API_URL_POPULAR + '&with_genres=' + encodeURI(selectedGenre.join(',')), popularmovielist);
                highlightSelection();

            });

            genElement.append(genrebox);
        });
    } catch (error) {
        console.error('Error:', error);
    }
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



// 88888888888888888888888    Fetch movie and show on main page  8888888888888888888888888888888888888


function fetchAndShowMovies(url, targetElement) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            targetElement.innerHTML = '';
            data.results.forEach((movie) => {

                const { title, poster_path, vote_average, release_date, original_language, id } = movie;

                const movieEl = document.createElement('div');
                movieEl.classList.add('movie-item');
                movieEl.classList.add('mb-50');

                movieEl.innerHTML = `
                
                    <div class="movie-poster" id="${id}">
                        <img src="${IMG_PATH + poster_path}" alt="${title}">
                    </div>
                    <div class="movie-content">
                        <div class="top">
                            <h5 class="title"><a href=''>${title}</a></h5>
                            <span class="date">${release_date.substring(0, 4)}</span>
                        </div>
                        <div class="bottom">
                            <ul>
                                <li><span class="quality">${original_language}</span></li>
                                <li>
                                    <span class="ratings"><i class="fas fa-star"></i>${vote_average}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                 </div>
                 `;

                targetElement.appendChild(movieEl);

                document.getElementById(id).addEventListener('click', () => {
                    openNav(movie);
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

fetchAndShowMovies(API_URL, main);
fetchAndShowMovies(API_URL_TOP_RATED, topRatedMovielist);
fetchAndShowMovies(API_URL_POPULAR, popularmovielist);





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
    var specialChar = /[!@#$%^&*]/;

    if (searchTerm !== '') {
        const searchURL = SEARCH_API + searchTerm;
        document.getElementById("hide1").style.display = 'none';
        document.getElementById("hide2").style.display = 'none';
        document.getElementById("hide3").style.display = 'none';
        document.getElementById("live-area").style.display = 'none';
        document.getElementById('home-banner').style.display = 'none';
        document.getElementById('topRated').style.display = 'none';
        document.getElementById('popular').style.display = 'none';
        document.getElementById('toprated-hide').style.display = 'none';
        document.getElementById('popular-hide').style.display = 'none';
        x.innerText = 'Search Results';
        x.style.margin = "150px 0px 51px -0px";
        fetchAndShowMovies(searchURL, main);
    }
    else if (specialChar.test(searchTerm)) {
        document.getElementById('topRated').style.display = 'none';
        document.getElementById('popular').style.display = 'none';
        document.getElementById('toprated-hide').style.display = 'none';
        document.getElementById('home-banner').style.display = 'none';
        x.innerText = 'Enter a valid movie name'
        document.getElementById('popular-hide').style.display = 'none';

    }
    else if (searchTerm == '') {
        fetchAndShowMovies(API_URL, main)
        document.getElementById('home-banner').style.display = 'block';
        document.getElementById('topRated').style.display = 'flex';
        document.getElementById('popular').style.display = 'flex';
        document.getElementById('toprated-hide').style.display = 'flex';
        document.getElementById("live-area").style.display = 'block';
        x.innerText = 'Now Playing';
        x.style.margin = "0px 0px 51px -0px";
        document.getElementById('popular-hide').style.display = 'block';
        document.getElementById("hide1").style.display = 'block';
        document.getElementById("hide2").style.display = 'block';
        document.getElementById("hide3").style.display = 'block';
    }
    console.log(search.value);
}, 600))


// 8888888888888888888    Searching the movie with debounce function 88888888888888888888888



