import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import gptReducer from './gptSlice';
import configReducer from './configSlice';
import modalSlice from './modalSlice';
import searchSlice from './searchSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    modal: modalSlice,
    search: searchSlice,
  },
});

export default appStore;
