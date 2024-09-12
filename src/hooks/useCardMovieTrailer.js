import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addModalTrailerVideo, setLoading } from '../utils/modalSlice';
import { useEffect } from 'react';

const useCardMovieTrailer = (movie_id) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.modal.trailerVideo);

  useEffect(() => {
    if (!movie_id || trailerVideo) return;

    const getMovieTrailer = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();

        const filteredData = json.results.filter(
          (video) => video.type === 'Trailer'
        );
        const trailer = filteredData.length ? filteredData[0] : json.results[0];

        if (trailer) {
          dispatch(addModalTrailerVideo(trailer));
        } else {
          dispatch(addModalTrailerVideo(null));
        }
      } catch (error) {
        console.error('Failed to fetch movie trailer:', error);
        dispatch(addModalTrailerVideo(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getMovieTrailer();
  }, [movie_id, trailerVideo, dispatch]);
};

export default useCardMovieTrailer;
