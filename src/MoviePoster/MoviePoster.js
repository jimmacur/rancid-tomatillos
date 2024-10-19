import './MoviePoster.css';
import React from 'react';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

function MoviePoster( { title, poster, voteCount } ) {
  return (
    <section className='MoviePoster'>
      <img className={'movie-poster'} src={poster} alt={title} /> 
      <p><span><img className={'upvote-arrow'} src={upvote} /></span>{voteCount}<span><img  className={'downvote-arrow'} src={downvote} /></span></p>
    </section>
  );
}

export default MoviePoster;