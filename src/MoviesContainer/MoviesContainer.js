import './MoviesContainer.css';
import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';

function MoviesContainer( { movies, onMovieClick } ) {
  return (
      <section className='MoviesContainer'>
        { movies.map( movie => (
          <MoviePoster 
            key={ movie.id }
            title={ movie.title }
            poster={ movie.poster_path }
            voteCount={ movie.vote_count }
            onClick={ onMovieClick }
            />
        )) }
      </section>
  );
}
  
export default MoviesContainer;