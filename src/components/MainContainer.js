import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';
import useMovieTrailer from '../hooks/useMovieTrailer';

const MainContainer = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const iframeRef = useRef(null);

  // Set the selected movie ID whenever the movies array changes
  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovieId(movies[0].id);
    }
  }, [movies]);

  // const handlePlay = () => {
  //   if (trailerVideo && trailerVideo.key) {
  //     const iframe = iframeRef.current;

  //     // Set the iframe src to the trailer video URL
  //     iframe.src = `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`;

  //     // Fullscreen functionality
  //     if (iframe.requestFullscreen) {
  //       iframe.requestFullscreen();
  //     } else if (iframe.mozRequestFullScreen) {
  //       iframe.mozRequestFullScreen();
  //     } else if (iframe.webkitRequestFullscreen) {
  //       iframe.webkitRequestFullscreen();
  //     } else if (iframe.msRequestFullscreen) {
  //       iframe.msRequestFullscreen();
  //     }
  //   }
  // };

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className='pt-[40%] bg-black md:pt-0'>
      <VideoTitle
        id={selectedMovieId}
        title={original_title}
        overview={overview}
        // handlePlay={handlePlay}
      />
      <VideoBackground movie_id={id} iframeRef={iframeRef} />
    </div>
  );
};

export default MainContainer;
