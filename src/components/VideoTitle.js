import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentClickedMovie, toggleModal } from '../utils/modalSlice';

const VideoTitle = ({ id, title, overview }) => {
  let [overviewText, setOverviewText] = useState('');
  let [infoText, setInfoText] = useState('More info');
  const dispatch = useDispatch();

  const updateStore = () => {
    dispatch(toggleModal());
    dispatch(currentClickedMovie(id));
  };

  function truncateSentence(sentence, limit) {
    const words = sentence.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return sentence;
  }
  useEffect(() => {
    setOverviewText(truncateSentence(overview, 20));
  }, [overview]);

  return (
    <div className='w-screen aspect-video pt-[12%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
      <p
        className='hidden md:inline-block py-4 text-lg w-1/3'
        aria-labelledby='movie-overview'
        aria-live='polite'
        role='contentinfo'
      >
        {overviewText}
      </p>
      <div className='my-2'>
        <button
          className='bg-[#1DB9C3] text-black py-1 md:p-3 px-2 md:px-12 mx-1 text-xl hover:bg-opacity-80 rounded-lg'
          onClick={updateStore}
          aria-label='Click to play trailer of this trending movie'
        >
          ▶️ Play
        </button>
        <button
          className='hidden md:inline-block bg-[#1DB9C3] text-white p-3 px-12 mx-1 text-xl bg-opacity-50 rounded-lg'
          onClick={() => {
            if (infoText === 'More info') {
              setOverviewText(overview);
              setInfoText('Less info');
            } else {
              setInfoText('More info');
              setOverviewText(truncateSentence(overview, 20));
            }
          }}
          aria-label='Click to see more info about this trending movie'
        >
          {infoText}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
