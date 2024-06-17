import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            photoURL: 'https://avatars.githubusercontent.com/u/75021544?v=4',
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
              navigate('/browse');
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
          navigate('/browse');
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
          src='https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_small.jpg'
          alt='logo'
        />
      </div>
      <form
        className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
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
