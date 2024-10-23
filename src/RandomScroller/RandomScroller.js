import { useState, useEffect } from 'react';

import "./RandomScroller.css";

function RandomScroller({ movies, getRandomFive, getFiveDetails }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  let fiveRandom = getRandomFive(movies, 5)
  let randomFive = getFiveDetails(fiveRandom)
  // console.log(fiveRandom, '<-- RANDOM 5 MOVIES')
  console.log(randomFive, '<-- 5 RANDOM MOVIES')

  // let randomFive = getRandomFive(movies, 5);
  // console.log(randomFive, '<-- RANDOM LIST HERE');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomFive.length)
    }, 5000);
    return () => clearInterval(intervalId)
  }, [randomFive]);

  return (
    <div className={'random-scroller-container'}>
      {
        randomFive.map((movie, index) => {
          return(
            <div key={movie.id} className={`movie-for-scroller ${ currentIndex === index ? 'currentIndex' : 'currentIndex-hidden' }`} >
              {/* <div className={'movie-scroller-img-1'} style={{backgroundImage: `url(${ movie.backdrop_path })`}} ></div> */}
              <img className={'movie-scroller-img'} src={`${movie.backdrop_path}`} />
              <p className={'movie-scroller-title'}>{movie.title}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default RandomScroller;