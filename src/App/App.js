import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer.js';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails.js';
import searchIcon from '../icons/search.png';
import homeIcon from '../icons/home.png';

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function addUpVote(anId) {
    let selectedMovie = movies.find((movie) => anId === movie.id);
    selectedMovie.vote_count += 1
    const updatedMovie = [...movies];
    setMovies(updatedMovie);
  };

  function addDownVote(anId) {
    let selectedMovie = movies.find((movie) => anId === movie.id);
    selectedMovie.vote_count -= 1;
    const updatedMovie = [...movies];
    setMovies(updatedMovie);
  };

  const handleMovieClick = (id) => {
    setSelectedMovie(movieDetails);
  }

  const onClose = () => setSelectedMovie(null)

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
          <header>
            <h1>
              Rancid Tomatillos
            </h1>
          </header>
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
