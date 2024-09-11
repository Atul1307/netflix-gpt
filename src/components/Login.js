import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
import bgImage from '../utils/images/background_img.png';

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(
      signInForm ? null : userName.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) {
      return;
    }

    //Sign in / Sign up logic
    if (!signInForm) {
      // Sign up logic below
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      // Sign in logic below
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='h-screen object-cover md:h-screen md:w-screen'
          src={bgImage}
          alt='logo'
        />
      </div>
      <form
        className='absolute p-10 bg-black w-full md:w-3/12 my-64 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className='py-1 font-bold text-3xl'>
          {signInForm ? 'Sign in' : 'Sign up'}
        </h1>
        {!signInForm && (
          <>
            <input
              ref={userName}
              type='text'
              placeholder='Enter your username'
              className='p-2 mt-3 mb-2 w-full bg-gray-700 rounded-lg'
              aria-label='Enter your username'
            />
            <small
              class='text-gray-500'
              aria-label='Your username must conainer only letters and number'
            >
              must contain only letters and numbers.
            </small>
          </>
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email address'
          className='p-2 mt-3 mb-2 w-full bg-gray-700 rounded-lg'
          aria-label='Enter your email address'
        ></input>
        {!signInForm && (
          <small class='text-gray-500' aria-label='Example - user@example.com'>
            e.g., user@example.com.
          </small>
        )}
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-2 mt-3 mb-2 w-full bg-gray-700 rounded-lg'
          aria-label='password'
        ></input>
        {!signInForm && (
          <small
            class='text-gray-500'
            aria-label='Your password must be at least 8 characters, at least one uppercase letter, one lowercase
            letter, and one number. Ex : Password1, StrongPass123'
          >
            at least 8 characters, at least one uppercase letter, one lowercase
            letter, and one number. Ex : Password1, StrongPass123
          </small>
        )}
        <p className='text-red-600 font-bold py-2'>{errorMessage}</p>
        <button
          className='p-3 my-2 bg-[#1DB9C3] w-full rounded-lg'
          onClick={handleButtonClick}
          aria-label={signInForm ? 'Click to sign in' : 'Click to sign up'}
        >
          {signInForm ? 'Sign in' : 'Sign up'}
        </button>
        <p className='py-4' onClick={toggleSignInForm}>
          {signInForm ? (
            <>
              New to TrailerFlix?
              <span
                className='text-[#1DB9C3] cursor-pointer'
                tabIndex={0}
                aria-label='New to TrailerFlix? Click here to sign up!'
                role='button'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleSignInForm();
                  }
                }}
              >
                {' '}
                Sign up now!
              </span>
            </>
          ) : (
            <>
              Already a user?
              <span
                className='text-[#1DB9C3] cursor-pointer'
                tabIndex={0}
                aria-label='Already a user? Click here to sign in!'
                role='button'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleSignInForm();
                  }
                }}
              >
                {' '}
                Sign in now!
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
