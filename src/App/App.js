import './App.css';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails';
// import searchIcon from '../icons/search.png';
=======
import MoviesContainer from '../MoviesContainer/MoviesContainer.js';
// import MoviePoster from '../MoviePoster/MoviePoster.js';
import moviePosters from '../data/movie_posters.js';
import rancid from '../icons/rancid.webp';
import searchIcon from '../icons/search.png';
import movieDetails from '../MovieDetails/MovieDetails';
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3

// Example imports (for later):
// import RandomScroller from '../RandomScroller/RandomScroller';

function App() {
  const [movies, setMovies] = useState(moviePosters);
<<<<<<< HEAD
  const [selectedMovie, setSelectedMovie] = useState(null);
=======

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
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3
  
  const handleMovieClick = () => {
    setSelectedMovie(movieDetails);
  }

  return (
    <main className='App'>
      <header>
        <h1>
          Rancid Tomatillos
        </h1>
      </header>
<<<<<<< HEAD
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : (
        <MoviesContainer movies={movies} onMovieClick={handleMovieClick} />
      )}
=======
      <MoviesContainer movies={ movies } addUpVote={ addUpVote } addDownVote={ addDownVote } />
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3
      
      {/* 
      <RandomScroller />
      <section className='SearchBar'>
      { userClick && <MovieDetails /> } https://image.tmdb.org/t/p/original//nnl6OWkyPpuMm595hmAxNW3rZFn.jpg
      */}
    </main>
  );
}

export default App;
