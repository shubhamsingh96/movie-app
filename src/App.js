import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";

const API_KEY = "cedf719006a6f825628d9ee8fb790415";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);


  const handleApiCall = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        setCurrentPage(res.page)
        setLastPage(res.total_pages);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(isSearchMode){
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`;
      handleApiCall(url);
    } else {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      handleApiCall(url);
    }
  }, [currentPage,isSearchMode])


  useEffect(() => {
    if(searchText === '' && isSearchMode){
      setCurrentPage(1);
      setIsSearchMode(false);
    }
  }, [searchText,isSearchMode])



  const handleTextChange = ({ target: { value } }) => {
    setError("");
    setSearchText(value);
  };

  const handleGetMovies = (e) => {
    e.preventDefault();
    if (searchText === "") {
      setError("Please type a movie name to search");
      return;
    }
    setCurrentPage(1);
    setIsSearchMode(true);
  };

  return (
    <div className="App">
      <Header
        handleTextChange={handleTextChange}
        handleGetMovies={handleGetMovies}
      />
      <div>
        {error !== "" && <p className="error-message">{error}</p>}
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px 0 0 0",
            padding: "0 30px",
          }}
        >
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onClick={(pg) => setCurrentPage(pg)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
