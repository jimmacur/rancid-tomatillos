import { useState, useEffect } from 'react';

import "./RandomScroller.css";

function RandomScroller({ theRandomList }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % theRandomList.length)
    }, 5000);
    return () => clearInterval(intervalId)
  }, [theRandomList]);

  if (theRandomList.length === 1) {
    return(
      <div className={'random-scroller-container-error'}>
        <h2 className={ 'error-message-title' }> NO MOVIES RECIEVED! </h2>
      </div>
    )
  } else {
    return (
      <div className={'random-scroller-container'}>
        {
          theRandomList.map((movie, index) => {
            // console.log(movie, '<-- MOVIE IN SCROLLER RETURN')
            return (
              <div key={movie.id} className={`movie-for-scroller ${currentIndex === index ? 'currentIndex' : 'currentIndex-hidden'}`} >
                {/* <div className={'movie-scroller-img-1'} style={{backgroundImage: `url(${ movie.backdrop_path })`}} ></div> */}
                <img className={'movie-scroller-img'} src={`${movie.backdrop_path}`} alt-text={' '} />
                <p className={'movie-scroller-title'}>{movie.title}</p>
              </div>
            )
          })
        }
      </div>
    )
  };
}

export default RandomScroller;