import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <section className='px-6 overflow-x-auto overflow-y-visible'>
      <h1 className='text-lg md:text-2xl py-4 text-white' aria-label={title}>
        {title}
      </h1>
      <div className='flex ' role='list'>
        <div className='flex' role='list'>
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              id={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
