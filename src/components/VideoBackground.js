import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movie_id, iframeRef }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movie_id);

  return (
    <div className='w-screen' tabIndex={-1} aria-hidden='true'>
      <iframe
        className='w-screen aspect-video'
        ref={iframeRef}
        src={
          'https://www.youtube.com/embed/' +
          trailerVideo?.key +
          '?&autoplay=1&mute=1&loop=1&playlist=' +
          trailerVideo?.key
        }
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        tabIndex={-1}
        aria-hidden='true'
      ></iframe>
    </div>
  );
};

export default VideoBackground;
