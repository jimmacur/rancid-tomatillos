import './App.css';
import { useState, useEffect } from 'react';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import moviePosters from '../data/movie_posters';
import searchIcon from '../icons/search.png';
import movieDetails from '../MovieDetails/MovieDetails';

// Example imports (for later):
// import RandomScroller from '../RandomScroller/RandomScroller';

function App() {
  const [movies, setMovies] = useState(moviePosters);
  
  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      <MoviesContainer movies={ movies } />
      
      {/* 
      <RandomScroller />
      <section className='SearchBar'>
      { userClick && <MovieDetails /> } 
      */}
    </main>
  );
}

export default App;
