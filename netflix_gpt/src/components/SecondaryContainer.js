import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className=' bg-black'>
        <div className='mt-0 md:-mt-52 pl-4 relative z-20'>
          <MovieList movies={movies.nowPlayingMovies} title={'Now playing'} />
          <MovieList movies={movies.popularMovies} title={'Popular'} />
          <MovieList movies={movies.topRatedMovies} title={'Top Rated'} />
          <MovieList movies={movies.upcomingMovies} title={'Upcoming movies'} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
