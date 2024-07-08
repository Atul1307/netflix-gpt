import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handlePageLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <img className='w-48 mx-auto md:mx-0' src={LOGO} alt='logo' />
      {user && (
        <div className='flex md:p-2 justify-between'>
          {showGPTSearch && (
            <select
              className='py-2 px-4 mx-4 my-2 mr-1 bg-violet-400 text-white rounded-lg'
              onChange={handlePageLanguage}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'
            onClick={handleGptSearchClick}
          >
            {showGPTSearch ? 'Homepage' : 'Search'}
          </button>
          <img
            className='hidden md:block mx-4 my-2 ml-1 w-10 h-12'
            src={user?.photoURL}
            alt='logo'
          />
          <button
            className='font-bold text-white m-2 ml-0'
            onClick={handleSignOut}
          >
            Sign out
            <p className='font-bold text-white '>{user.displayName}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
