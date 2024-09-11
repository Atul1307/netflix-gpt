import React, { useEffect, useRef, useState } from 'react';
import languageConstants from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { cacheResults } from '../utils/searchSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  // eslint-disable-next-line no-unused-vars
  const [movieResult, setMovieResult] = useState(null);

  // const handleClear = () => {
  //   searchText.current.value = '';
  //   dispatch(
  //     addGptMovieResult({
  //       movieGptNames: searchText.current.value,
  //       movieTmdbResults: null,
  //     })
  //   );
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setMovieResult(searchCache[searchQuery]);
        // dispatching so that movieCards are also updated for the query results which are already cached
        dispatch(
          addGptMovieResult({
            movieGptNames: searchText.current.value,
            movieTmdbResults: searchCache[searchQuery],
          })
        );
      } else {
        handleGptSearchClick();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

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

    const data = await searchMovieTMDB(searchText.current.value);
    setMovieResult(data);
    dispatch(
      cacheResults({
        [searchQuery]: data,
      })
    );
    dispatch(
      addGptMovieResult({
        movieGptNames: searchText.current.value,
        movieTmdbResults: data,
      })
    );
  };
  return (
    <div className='pt-[45%] md:pt-[10%] flex justify-center'>
      <form
        className='w-3/4 md:w-1/2 bg-black grid grid-cols-12 gap-2'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='relative col-span-12 p-3'>
          <input
            ref={searchText}
            type='text'
            value={searchQuery}
            className='p-4 w-full rounded-md'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={languageConstants[langKey].gptSerchPlaceholder}
            aria-label='Search input bar to search movies'
            tabIndex={0}
          />
          <button
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-1 hover:bg-gray-400 focus:outline-blue-500'
            onClick={() => setSearchQuery('')}
            aria-label='Clear button'
            tabIndex={0}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11.414l2.828 2.829a1 1 0 01-1.415 1.415L10 9.415l-2.828 2.829a1 1 0 11-1.415-1.415L8.586 8 5.758 5.171a1 1 0 011.415-1.415L10 6.586l2.828-2.83a1 1 0 011.415 1.415L11.414 8z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {/* Disabling searcch button as we are using autocomplete feature and firing an API call using throttling concept */}
        {/* <button
          className='m-4 py-2 px-4 col-span-4 md:col-span-2 bg-[#1DB9C3] text-white rounded-lg flex items-center justify-center'
          onClick={handleGptSearchClick}
        >
          {languageConstants[langKey].search}
        </button> */}
      </form>
    </div>
  );
};

export default GptSearchBar;
