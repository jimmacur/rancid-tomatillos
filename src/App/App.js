import "./App.css";
import homeIcon from "../icons/home.png";
import MovieDetails from "../MovieDetails/MovieDetails.js";
import RandomScroller from "../RandomScroller/RandomScroller.js";
import MoviesContainer from "../MoviesContainer/MoviesContainer.js";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  function fetchMovies() {
    fetch(`${API_BASE_URL}`)
      .then((response) => {
        if (!response.ok && response.status === 404) {
          alert('Oops! Something is wrong at the server! Please try accessing Rancid Tomatillos later!')
        } else if (!response.ok) {
          alert('Oops! something went wrong! Please refresh the page!')
        } else {
          return response.json()
        }
      })
      .then((data) => setMovies(data))
      .catch((error) => console.log(error, '<-- FROM .CATCH ERROR MSG'));
  }

  function fetchMovieDetails(id) {
    fetch(`${API_BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedMovie(data))
      .catch((error) => console.error(error));
  }

  function handleVote(anId, voteDirection) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === anId
          ? { ...movie, vote_count: movie.vote_count + (voteDirection === 'up' ? 1 : -1) }
          : movie
      )
    );
    postVoteChange(voteDirection, anId);
  }

  function postVoteChange(voteDirection, id) {
    const requestBody = {
      vote_direction: voteDirection
    };

    fetch(
      `${API_BASE_URL}/${id}`,
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

  const handleClose = () => {
    setSelectedMovie(null);
    navigate("/");
  };

  let theRandomList = [];

  function getRandomFive(aMovieList, numOfMovies) {
    let index = [...aMovieList].sort(() => 0.5 - Math.random());
    return index.slice(0, numOfMovies);
  }

  function getFiveDetails(aMovieList) {
    aMovieList.forEach((film) => {
      fetch(`${API_BASE_URL}/${film.id}`)
      .then((response) => response.json())
      .then((data) => {
        theRandomList.push(data);
      })
      .catch((error) => console.error(error));
    });
  };

  async function forRandomScroller() {
    if (movies === undefined) {
      theRandomList.push('NO MOVIES RECIEVED!')
    } else {
      let randomFive = getRandomFive(movies, 5);
      await getFiveDetails(randomFive)
    }
  };

  forRandomScroller();

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
              <RandomScroller theRandomList={theRandomList} />
              <MoviesContainer
                movies={movies}
                addUpVote={(id) => handleVote(id, 'up')}
                addDownVote={(id) => handleVote(id, 'down')}
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
                <button className="home-button" onClick={handleClose}>
                  <img className={"home-button-img"} src={homeIcon} alt="home icon" />
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
