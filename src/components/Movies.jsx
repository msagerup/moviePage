import useInfiniteScroll from "../Hooks/useInfiniteScroll";
import "../styles/movies.scss";
import Movie from "./Movie";

const Movies = ({ movies, fetchMoreMovies }) => {
  const loadMoreRef = useInfiniteScroll(fetchMoreMovies);

  return (
    <div data-testid='movies' className='grid'>
      {movies.movies.results?.map((movie, index, arr) => {
        if (arr.length - 1 === index) {
          // Set the ref to the last element.
          return <Movie key={movie.id} movie={movie} ref={loadMoreRef} />;
        } else {
          return <Movie key={movie.id} movie={movie} />;
        }
      })}
    </div>
  );
};

export default Movies;
