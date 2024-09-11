import React from 'react';
import { useSelector } from 'react-redux';
import useCardMovieTrailer from '../hooks/useCardMovieTrailer';

const VideoPopover = React.memo(({ isOpen, onClose }) => {
  const movie_id = useSelector((store) => store.modal.movieID);
  const trailerVideo = useSelector((store) => store.modal.trailerVideo);

  useCardMovieTrailer(movie_id);
  const isLoading = useSelector((store) => store.modal.isLoading);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className='w-full h-full relative z-50'
        tabIndex={0}
        aria-label='Click to close the trailer popover'
      >
        {/* Close Button */}
        <button
          className='absolute text-6xl top-4 right-6 z-50 text-white hover:text-gray-300'
          onClick={onClose}
          tabIndex={0}
        >
          &times;
        </button>

        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <span className='text-lg bg-white'>Loading...</span>
          </div>
        ) : (
          <div aria-hidden='true' tabIndex={-1} className='w-full h-full'>
            <iframe
              className='w-full h-full'
              tabIndex={-1}
              src={
                'https://www.youtube.com/embed/' +
                trailerVideo.key +
                '?&autoplay=1&mute=1'
              }
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerpolicy='strict-origin-when-cross-origin'
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
});

export default VideoPopover;
