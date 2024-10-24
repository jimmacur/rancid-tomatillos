import './MoviePoster.css';
import React from 'react';
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

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter') {
      action(event);
    }
  }

  return (
    <section 
      className='MoviePoster' 
      onClick={handleClick}
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event, handleClick)}
    >
      <img 
        className={'movie-poster'} 
        src={poster} 
        alt={title ? `Poster for ${title}` : 'Movie poster'}      
      /> 
      <p className={'vote-count-box'}>
        <span className={'upvote-span'}>
          <img 
            className={'upvote-arrow'} 
            src={upvote} 
            onClick={ handleUpVote } 
            tabIndex="0"
            onKeyDown={(event) => handleKeyPress(event, handleUpVote)}
            alt="Upvote"  
          />
        </span>
        {voteCount}
        <span className={'downvote-span'}>
          <img 
            className={'downvote-arrow'} 
            src={downvote} 
            onClick={ handleDownVote } 
            tabIndex="0"
            onKeyDown={(event) => handleKeyPress(event, handleDownVote)}
            alt="Downvote"  
          />
        </span>
      </p>
    </section>
  );
}

export default MoviePoster;