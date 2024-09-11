import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { toggleModal, currentClickedMovie } from '../utils/modalSlice';

const MovieCard = ({ title, id, posterPath }) => {
  const dispatch = useDispatch();

  const movie_id = id;
  const updateStore = () => {
    dispatch(toggleModal());
    dispatch(currentClickedMovie(movie_id));
  };

  if (!posterPath) return null;

  return (
    <div className='relative w-36 md:w-44 pr-4 cursor-pointer transition-transform duration-300 hover:scale-125 hover:-translate-y-4 hover:z-50'>
      <div
        className='focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
        onClick={() => updateStore()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateStore();
          }
        }}
        aria-label='Click to play trailer'
        role='listitem'
        tabIndex={0}
        onFocus={(e) => {
          // Scroll the focused element into view
          e.currentTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest', // Ensures it scrolls only as much as needed
            inline: 'center', // Centers the focused element horizontally
          });
        }}
      >
        <img
          alt={`${title} Thumbnail`}
          src={IMG_CDN_URL + posterPath}
          className='w-full h-auto '
        />
      </div>
    </div>
  );
};

export default MovieCard;
