import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from './MovieList';
import { addGptMovieResult } from '../utils/gptSlice';

const GptMovieSuggestions = () => {
  const { gptMovies, tmdbResult } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(
        addGptMovieResult({
          movieGptNames: null,
          movieTmdbResults: [],
        })
      );
    };
  }, []);
  if (!tmdbResult || !tmdbResult.length) return null;

  return (
    <div className='p-4 m-4 bg-[#121212] text-white bg-opacity-90'>
      <div>
        <MovieList title={gptMovies} movies={tmdbResult} />
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
