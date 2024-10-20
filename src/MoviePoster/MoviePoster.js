import './MoviePoster.css';
import React from 'react';
import { useState } from 'react';
import upvote from '../icons/upvote.png';
import downvote from '../icons/downvote.png';

function MoviePoster( { id, title, poster, voteCount, addUpVote, addDownVote, onClick } ) {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(id);
  };

  const handleUpVote = (event) => {
    event.stopPropagation();
    addUpVote(id);
  };

  const handleDownVote = (event) => {
    event.stopPropagation();
    addDownVote(id);
  };


  return (
    <section className='MoviePoster' onClick={handleClick}>
      <img className={'movie-poster'} src={poster} alt={title} /> 
      <p className={'vote-count-box'}>
        <span className={'upvote-span'}>
          <img className={'upvote-arrow'} src={upvote} onClick={ handleUpVote } />
        </span>
        {voteCount}
        <span className={'downvote-span'}>
          <img className={'downvote-arrow'} src={downvote} onClick={ handleDownVote } />
        </span>
      </p>
    </section>
  );
}

export default MoviePoster;