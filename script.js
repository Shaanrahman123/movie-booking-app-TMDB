const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=732226ccd502e9fe6b05962474129645'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=732226ccd502e9fe6b05962474129645&query="'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=732226ccd502e9fe6b05962474129645';

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


// genres area
const genElement = document.getElementById("genre-element");

var selectedGenre = [];
setGenre();
function setGenre() {
    genElement.innerHTML = '';

    fetch(BASE_URL + '/genre/movie/list?' + API_KEY)
        .then(res => res.json())
        .then(({genres}) => {
            genres.forEach(genre => {
                const genrebox = document.createElement('div');
                genrebox.classList.add('genre-element');
                genrebox.id = genre.id;
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
// genres area



getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <div id="${id}">
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        </div>
        `
        main.appendChild(movieEl)

        document.getElementById(id).addEventListener('click', () => {
            openNav(movie);
        })
    })
}


// get movie details area 

const detailsofmovie = document.getElementById("movie_details")

function openNav(movie) {
    detailsofmovie.innerHTML = '';
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
        .then(res => res.json())
        .then(({ title, overview, poster_path, original_language, vote_average, runtime, genres }) => {

            let genreName = [];
            for (let i = 0; i < genres.length; i++) {
                genreName.push(genres[i].name);
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



// get movie details area 

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    }
    else if (vote >= 5) {
        return 'orange'
    }
    else {
        return 'red';
    }
}





// ********************* Search Part **********************
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }
    else if (searchTerm == '') {
        getMovies(API_URL)
    }
})
// ********************* Search Part **********************

// open the genre part


function openGenre() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeGenre() {
    document.getElementById("mySidenav").style.width = "0";
}


document.querySelector('#openbtn-genre').addEventListener('click', openGenre)
document.querySelector('.closebtn-genre').addEventListener('click', closeGenre)





// open the genre part