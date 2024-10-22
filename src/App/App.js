import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer.js';
import MovieDetails from '../MovieDetails/MovieDetails.js';
import RandomScroller from '../RandomScroller/RandomScroller.js';
import searchIcon from '../icons/search.png';
import homeIcon from '../icons/home.png';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => { 
    fetchMovies()
  }, []);

  function fetchMovies() {
    fetch('https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data); 
      })
      .catch(error => console.error(error))
  }

  function fetchMovieDetails(id) {
    fetch(`https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${id}`)
      .then(response => response.json())
      .then(data => setSelectedMovie(data))
      .catch(error => console.error(error))
  }

  function addUpVote(anId) {
    let selectedMovie = movies.find((movie) => anId === movie.id);
    const newVoteCount = selectedMovie.vote_count + 1
    postVoteChange(newVoteCount, anId);
  };

  function addDownVote(anId) {
    let selectedMovie = movies.find((movie) => anId === movie.id);
    const newVoteCount = selectedMovie.vote_count - 1;
    postVoteChange(newVoteCount, anId);
  };

  function postVoteChange(aChange, movieId){
    fetch(`https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vote_count: aChange })
    })
      .then(response => response.json())
      .then(data => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === movieId) {
            return { ...movie, vote_count: aChange }
          }
        return movie
        });
        setMovies(updatedMovies)
        })
      .catch(error => console.error(error))
  }

  const handleMovieClick = (id) => {
    fetchMovieDetails(id);
  }

  const onClose = () => setSelectedMovie(null)

  function getRandomFive(aMovieList, numOfMovies) {
    // console.log(aMovieList)
    let index = [...aMovieList].sort(() => 0.5 - Math.random())
    // console.log(index, '<-- INDEX FROM RANDOM FUNC')
    return index.slice(0, numOfMovies)
  };

  return (
    <main className='App'>
      {
        selectedMovie ?
          <header>
            <h1>
              Rancid Tomatillos
            </h1>
            <button className='home-button' onClick={onClose}>
              <img src={homeIcon} alt='home icon' />
            </button>
          </header> :
          <>
            <header>
              <h1>
                Rancid Tomatillos
              </h1>
            </header>
            <RandomScroller getRandomFive={getRandomFive} movies={movies} />
          </>
      }
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie} />
      ) : (
        <MoviesContainer
          movies={movies}
          addUpVote={addUpVote}
          addDownVote={addDownVote}
          onMovieClick={handleMovieClick} />
      )}
    </main>
  );
}
export default App;
