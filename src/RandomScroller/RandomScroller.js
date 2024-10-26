import { useState, useEffect } from 'react';

import "./RandomScroller.css";

function RandomScroller({ theRandomList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stateRandomList, setStateRandomList] = useState([])

  useEffect(() => {
    delayStateFunc()
  }, []);
  
  function delayStateFunc () {
    setTimeout(() => {
      console.log('HIT DELAY')
      setStateRandomList([...theRandomList])
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stateRandomList.length)
    }, 5000);
    return () => clearInterval(intervalId)
  }, [stateRandomList]);

  if (stateRandomList.length === 1) {
    return(
      <div className={'random-scroller-container-error'}>
        <h2 className={ 'error-message-title' }> NO MOVIES RECIEVED! </h2>
      </div>
    )
  } else {
    return (
      <div className={'random-scroller-container'}>
        {
          stateRandomList.map((movie, index) => {
            return (
              <div key={movie.id} className={`movie-for-scroller ${currentIndex === index ? 'currentIndex' : 'currentIndex-hidden'}`} >
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