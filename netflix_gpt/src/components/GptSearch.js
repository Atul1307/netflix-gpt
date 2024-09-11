import React from 'react';
import GptMovieSuggestions from './GptMovieSuggestions';
import GptSearchBar from './GptSearchBar';
import page_background from '../utils/images/background_img.png';

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img
          className='h-screen md:h-screen object-cover md:w-screen'
          src={page_background}
          alt='logo'
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
        <div className='bg-black'>
          <p className='text-[#1DB9C3] text-center mt-8 font-bold text-3xl'>
            ChatGPT support coming soon!!!
          </p>
        </div>
      </div>
    </>
  );
};

export default GptSearch;
