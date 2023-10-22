import useInfiniteScroll from "../Hooks/useInfiniteScroll";
import "../styles/movies.scss";
import Movie from "./Movie";

const Movies = ({ movies, fetchMoreMovies }) => {
  const loadMoreRef = useInfiniteScroll(fetchMoreMovies);

  return (
    <div data-testid='movies' className='grid'>
      {movies.movies.results?.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default Movies;
