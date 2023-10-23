import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../assets/not-found-500X750.jpeg";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import Modal from "./Modal";

const Movie = forwardRef((props, ref) => {
  const { movie } = props;
  const state = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { starred, watchLater } = state;
  const { starMovie, unStarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const dispatch = useDispatch();

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div ref={ref} className='card'>
        <div className='card-body text-center'>
          <div className='overlay' />
          <div className='info_panel'>
            <div className='overview'>{movie.overview}</div>
            <div className='year'>{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <span
                className='btn-star'
                data-testid='starred-link'
                onClick={() =>
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                <i className='bi bi-star' />
              </span>
            ) : (
              <span
                className='btn-star'
                data-testid='unstar-link'
                onClick={() => dispatch(unStarMovie(movie))}
              >
                <i className='bi bi-star-fill' data-testid='star-fill' />
              </span>
            )}
            {!watchLater.watchLaterMovies
              .map((movie) => movie.id)
              .includes(movie.id) ? (
              <button
                type='button'
                data-testid='watch-later'
                className='btn btn-light btn-watch-later'
                onClick={() =>
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  )
                }
              >
                Watch Later
              </button>
            ) : (
              <button
                type='button'
                data-testid='remove-watch-later'
                className='btn btn-light btn-watch-later blue'
                onClick={() => dispatch(removeFromWatchLater(movie))}
              >
                <i className='bi bi-check'></i>
              </button>
            )}
            <button
              type='button'
              className='btn btn-dark'
              onClick={() => setIsModalOpen(true)}
            >
              View Trailer
            </button>
          </div>
          <img
            className='center-block'
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt='Movie poster'
          />
        </div>
        <h6 className='title mobile-card'>{movie.title}</h6>
        <h6 className='title'>{movie.title}</h6>
      </div>
      {isModalOpen && (
        <Modal movieId={movie.id} isModalOpen={isModalOpen} onClose={onClose} />
      )}
    </>
  );
});

export default Movie;
