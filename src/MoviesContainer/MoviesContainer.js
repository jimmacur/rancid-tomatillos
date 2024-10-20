import './MoviesContainer.css';
import React from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';

<<<<<<< HEAD
function MoviesContainer( { movies, onMovieClick } ) {
=======
function MoviesContainer( { movies, addUpVote, addDownVote } ) {
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3
  return (
      <section className='MoviesContainer'>
        { movies.map( movie => (
          <MoviePoster 
            key={ movie.id }
            id={ movie.id }
            title={ movie.title }
            poster={ movie.poster_path }
            voteCount={ movie.vote_count }
<<<<<<< HEAD
            onClick={ onMovieClick }
=======
            addUpVote={ addUpVote }
            addDownVote={ addDownVote }
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3
            />
        )) }
      </section>
  );
}
  
export default MoviesContainer;