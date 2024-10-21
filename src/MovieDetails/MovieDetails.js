import './MovieDetails.css';
import React from 'react';
import homeIcon from '../icons/home.png';

function MovieDetails({ movie }) {
  return (
    <section className='MovieDetails'>
        <img className='backdrop' src={movie.backdrop_path} alt={`${movie.title} backdrop`} />
      <div className='movie-info'>
        <div className='details'>
          <h2 className='movie-title'>{movie.title}</h2>
          <p className='release-date'><strong>Release Date:</strong> {movie.release_date}</p>
          <p className='genres'><strong>Genres:</strong></p>
          <div className='genre-container'>
            {movie.genre_ids.map((genre) => (
              <div key={genre} className='single-genre'>
                {genre}
              </div>
            ))}
          </div>
          <p className='overview'><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;