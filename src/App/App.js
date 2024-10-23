import "./App.css";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer.js";
import MovieDetails from "../MovieDetails/MovieDetails.js";
import RandomScroller from "../RandomScroller/RandomScroller.js";
import homeIcon from "../icons/home.png";
import { Routes, Route, useNavigate } from "react-router-dom";
// import searchIcon from '../icons/search.png';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    fetch(
      "https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies"
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => console.error(error));
  }

  function fetchMovieDetails(id) {
    fetch(
      `https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${id}`
    )
      .then((response) => response.json())
      .then((data) => setSelectedMovie(data))
      .catch((error) => console.error(error));
  }

  function addUpVote(anId) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === anId
          ? { ...movie, vote_count: movie.vote_count + 1 }
          : movie
      )
    );
    postVoteChange('up', anId);
  }
  
  function addDownVote(anId) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === anId
          ? { ...movie, vote_count: movie.vote_count - 1 }
          : movie
      )
    );
    postVoteChange('down', anId);
  }

  function postVoteChange(voteDirection, id) {
    const requestBody = {
      vote_direction: voteDirection 
    };

    fetch(
      `https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
    .then((response) => {
      if (!response.ok) throw Error('Failed to update vote');
      return response.json();
    })
    .catch((error) => {
      console(error => console.error(error));
    });
  }

  const handleMovieClick = (id) => {
    fetchMovieDetails(id);
    navigate(`/movies/${id}`);
  };

  const onClose = () => {
    setSelectedMovie(null);
    navigate("/");
  };

  function getRandomFive(aMovieList, numOfMovies) {
    let index = [...aMovieList].sort(() => 0.5 - Math.random());
    return index.slice(0, numOfMovies);
  }

  function getFiveDetails(aMovieList) {
    let fiveRandomDetails = [];
    // console.log(aMovieList, "<-- CHECK HERE IN FIVE DETAILS FUNC");
    aMovieList.forEach((film) => {
      fetch(
        `https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${film.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data, "<-- CHECK HERE TOO IN FIVE DETAILS FUNC");
          fiveRandomDetails.push(data);
        })
        .catch((error) => console.error(error));
    });
    return fiveRandomDetails;
  }

  return (
    <main className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header>
                <h1>Rancid Tomatillos</h1>
              </header>
              {/* <RandomScroller getRandomFive={getRandomFive} movies={movies} /> */}
              <RandomScroller
                movies={movies}
                getRandomFive={getRandomFive}
                getFiveDetails={getFiveDetails}
              />
              <MoviesContainer
                movies={movies}
                addUpVote={addUpVote}
                addDownVote={addDownVote}
                onMovieClick={handleMovieClick}
              />
            </>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <>
              <header>
                <h1>Rancid Tomatillos</h1>
                <button className="home-button" onClick={onClose}>
                  <img src={homeIcon} alt="home icon" />
                </button>
              </header>
              {selectedMovie && <MovieDetails movie={selectedMovie} />}
            </>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
