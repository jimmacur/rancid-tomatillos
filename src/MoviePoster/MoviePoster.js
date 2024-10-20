import './MoviePoster.css';
import React from 'react';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

function MoviePoster( { id, title, poster, voteCount, onClick } ) {
  return (
    <section className='MoviePoster' onClick={() => onClick(id)}>
      <img className={'movie-poster'} src={poster} alt={title} /> 
      <p className={'vote-count-box'}><span className={'upvote-span'}><img className={'upvote-arrow'} src={upvote} /></span>{voteCount}<span className={'downvote-span'}><img  className={'downvote-arrow'} src={downvote} /></span></p>
    </section>
  );
}

export default MoviePoster;