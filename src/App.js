import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Routes,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./app.scss";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import { API_KEY, ENDPOINT, ENDPOINT_DISCOVER } from "./constants";
import { fetchMovies } from "./data/moviesSlice";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(
        fetchMovies(
          `${ENDPOINT}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${1}&api_key=${API_KEY}`
        )
      );

      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${1}`));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    // Reset to page 1.
    setPage(1);
    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies(
          `${ENDPOINT}/search/movie?query=${encodeURIComponent(
            searchQuery
          )}&page=${page}&api_key=${API_KEY}`
        )
      );
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`));
    }
  };

  const fetchMoreMovies = () => {
    if (movies.fetchStatus !== "loading") {
      setPage((prevPage) => prevPage + 1);
      getMovies();
    }
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        getMovies();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      <Header searchMovies={searchMovies} setPage={setPage} />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <Movies movies={movies} fetchMoreMovies={fetchMoreMovies} />
            }
          />
          <Route path='/starred' element={<Starred />} />
          <Route path='/watch-later' element={<WatchLater />} />
          <Route
            path='*'
            element={<h1 className='not-found'>Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
