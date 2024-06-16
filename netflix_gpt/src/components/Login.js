import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_small.jpg'
          alt='logo'
        />
      </div>
      <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='py-2 font-bold text-3xl'>
          {signInForm ? 'Sign in' : 'Sign up'}
        </h1>
        {!signInForm && (
          <input
            type='text'
            placeholder='Enter your name'
            className='p-2 my-4 w-full bg-gray-700 rounded-lg'
          />
        )}
        <input
          type='text'
          placeholder='Email address'
          className='p-2 my-4 w-full bg-gray-700 rounded-lg'
        ></input>
        <input
          type='text'
          placeholder='Password'
          className='p-2 my-4 w-full bg-gray-700 rounded-lg'
        ></input>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>
          {signInForm ? 'Sign in' : 'Sign up'}
        </button>
        <p className='py-4' onClick={toggleSignInForm}>
          {signInForm
            ? 'New to netflix-gpt? Sign up now!'
            : 'Already a user? Sign in now!'}
        </p>
      </form>
    </div>
  );
};

export default Login;
