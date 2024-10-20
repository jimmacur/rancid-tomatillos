import './MoviePoster.css';
import React from 'react';
import { useState } from 'react';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

function MoviePoster( { id, title, poster, voteCount, addUpVote, addDownVote } ) {
  return (
    <section className='MoviePoster'>
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