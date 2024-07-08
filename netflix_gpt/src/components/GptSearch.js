import React from 'react';
import GptMovieSuggestions from './GptMovieSuggestions';
import GptSearchBar from './GptSearchBar';
import { PAGE_BACKGROUND } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img
          className='h-screen md:h-auto object-cover'
          src={PAGE_BACKGROUND}
          alt='logo'
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
        <div className='bg-black'>
          <p className='text-red-600 text-center mt-8 font-bold text-3xl'>
            ChatGPT support coming soon!!!
          </p>
        </div>
      </div>
    </>
  );
};

export default GptSearch;
