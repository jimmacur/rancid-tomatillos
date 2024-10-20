import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer.js';
import RandomScroller from '../RandomScroller/RandomScroller.js';
import moviePosters from '../data/movie_posters.js';
import rancid from '../icons/rancid.webp';
import searchIcon from '../icons/search.png';
import movieDetails from '../MovieDetails/MovieDetails';


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
      <RandomScroller />
      <MoviesContainer movies={ movies } addUpVote={ addUpVote } addDownVote={ addDownVote } />
      
      {/* 
      <section className='SearchBar'>
      { userClick && <MovieDetails /> } https://image.tmdb.org/t/p/original//nnl6OWkyPpuMm595hmAxNW3rZFn.jpg
      */}
    </main>
  );
}

export default App;
