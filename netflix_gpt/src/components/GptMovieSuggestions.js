import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const { gptMovies, tmdbResult } = useSelector((store) => store.gpt);
  if (!tmdbResult || !tmdbResult.length) return null;

  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
      <div>
        <MovieList title={gptMovies} movies={tmdbResult} />
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
