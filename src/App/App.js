import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails';
// import searchIcon from '../icons/search.png';

// Example imports (for later):
// import RandomScroller from '../RandomScroller/RandomScroller';

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
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
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : (
        <MoviesContainer movies={movies} onMovieClick={handleMovieClick} />
      )}
      
      {/* 
      <RandomScroller />
      <section className='SearchBar'>
      { userClick && <MovieDetails /> } https://image.tmdb.org/t/p/original//nnl6OWkyPpuMm595hmAxNW3rZFn.jpg
      */}
    </main>
  );
}

export default App;
