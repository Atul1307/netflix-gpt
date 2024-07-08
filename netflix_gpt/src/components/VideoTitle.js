import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='w-screen aspect-video pt-[12%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-4 text-lg w-1/3'>{overview}</p>
      <div className='my-2'>
        <button className='bg-white text-black py-1 md:py-4 px-2 md:px-12 text-xl hover:bg-opacity-80 rounded-lg'>
          ▶️ Play
        </button>
        <button className='hidden md:inline-block bg-gray-500 text-white p-4 px-12 mx-2 text-xl bg-opacity-50 rounded-lg'>
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
