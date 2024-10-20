import './MoviePoster.css';
import React from 'react';
import { useState } from 'react';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

<<<<<<< HEAD
function MoviePoster( { id, title, poster, voteCount, onClick } ) {
=======
function MoviePoster( { id, title, poster, voteCount, addUpVote, addDownVote } ) {
>>>>>>> bf10c3e3bea115a2209feafe9f052825b6d12ad3
  return (
    <section className='MoviePoster' onClick={() => onClick(id)}>
      <img className={'movie-poster'} src={poster} alt={title} /> 
      <p className={'vote-count-box'}>
        <span className={'upvote-span'}><img className={'upvote-arrow'} src={upvote} onClick={ () => {addUpVote(id)} } /></span>
        {voteCount}
        <span className={'downvote-span'}><img className={'downvote-arrow'} src={downvote} onClick={ () => {addDownVote(id)} } /></span>
      </p>
    </section>
  );
}

export default MoviePoster;