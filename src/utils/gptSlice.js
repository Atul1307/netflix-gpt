import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name: 'gpt',
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    tmdbResult: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieGptNames, movieTmdbResults } = action.payload;
      state.gptMovies = movieGptNames;
      state.tmdbResult = movieTmdbResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
