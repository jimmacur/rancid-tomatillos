import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer.js';
// import MoviePoster from '../MoviePoster/MoviePoster.js';
import moviePosters from '../data/movie_posters.js';
import rancid from '../icons/rancid.webp';
import searchIcon from '../icons/search.png';
import movieDetails from '../MovieDetails/MovieDetails';

// Example imports (for later):
// import RandomScroller from '../RandomScroller/RandomScroller';

function App() {
  const [movies, setMovies] = useState(moviePosters);

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
  
  return (
    <main className='App'>
      <header>
        <h1>
          Rancid Tomatillos
          </h1>
      </header>
      <MoviesContainer movies={ movies } addUpVote={ addUpVote } addDownVote={ addDownVote } />
      
      {/* 
      <RandomScroller />
      <section className='SearchBar'>
      { userClick && <MovieDetails /> } https://image.tmdb.org/t/p/original//nnl6OWkyPpuMm595hmAxNW3rZFn.jpg
      */}
    </main>
  );
}

export default App;
