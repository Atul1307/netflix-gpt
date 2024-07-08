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
import { PAGE_BACKGROUND, USER_AVATAR } from '../utils/constants';

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
          className='h-screen object-cover md:h-auto'
          src={PAGE_BACKGROUND}
          alt='logo'
        />
      </div>
      <form
        className='absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className='py-2 font-bold text-3xl'>
          {signInForm ? 'Sign in' : 'Sign up'}
        </h1>
        {!signInForm && (
          <input
            ref={userName}
            type='text'
            placeholder='Enter your name'
            className='p-2 my-4 w-full bg-gray-700 rounded-lg'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email address'
          className='p-2 my-4 w-full bg-gray-700 rounded-lg'
        ></input>
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='p-2 my-4 w-full bg-gray-700 rounded-lg'
        ></input>
        <p className='text-red-600 font-bold py-2'>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}
        >
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
