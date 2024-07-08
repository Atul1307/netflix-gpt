import React, { useRef } from 'react';
import languageConstants from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movieName) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movieName +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // TODO: Commented out below code as the openAI API doesn't work for new users.
    // const moviesList = ['Welcome', 'Hera Pheri', 'Aavesham', 'Bhool bhulaiya'];
    // const promiseArray = await moviesList.map((movies) =>
    //   searchMovieTMDB(movies)
    // );
    // const tmdbResults = await Promise.all(promiseArray);
    // console.log(tmdbResults);

    const movieResult = await searchMovieTMDB(searchText.current.value);
    dispatch(
      addGptMovieResult({
        movieGptNames: searchText.current.value,
        movieTmdbResults: movieResult,
      })
    );
  };
  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
      <form
        className='md:w-1/2 bg-black grid grid-cols-12 mt-4'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          className='p-4 m-4 col-span-8 md:col-span-10'
          placeholder={languageConstants[langKey].gptSerchPlaceholder}
        />
        <button
          className='m-4 py-2 px-4 col-span-4 md:col-span-2 bg-red-700 text-white rounded-lg'
          onClick={handleGptSearchClick}
        >
          {languageConstants[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
