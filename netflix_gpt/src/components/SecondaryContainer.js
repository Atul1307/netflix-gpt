import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className=' bg-black'>
        <div className='-mt-52 relative z-20'>
          <MovieList movies={movies.nowPlayingMovies} title={'Now playing'} />
          <MovieList movies={movies.nowPlayingMovies} title={'Trending'} />
          <MovieList movies={movies.popularMovies} title={'Popular'} />
          <MovieList
            movies={movies.nowPlayingMovies}
            title={'Upcoming movies'}
          />
          <MovieList movies={movies.nowPlayingMovies} title={'Horror'} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
