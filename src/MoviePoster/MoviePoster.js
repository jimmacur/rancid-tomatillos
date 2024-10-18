import './MoviePoster.css';
import React from 'react';

function MoviePoster( { title, poster, voteCount } ) {
  return (
    <section className='MoviePoster'>
      <img src={poster} alt={title} /> 
      <h2>{title}</h2>
      <p>{voteCount}</p>
    </section>
  );
}

export default MoviePoster;