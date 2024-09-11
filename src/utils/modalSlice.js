import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    movieID: null,
    isLoading: false,
    trailerVideo: null,
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    currentClickedMovie: (state, action) => {
      state.movieID = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addModalTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    resetTrailerVideo: (state) => {
      state.trailerVideo = null;
    },
  },
});

export const {
  toggleModal,
  currentClickedMovie,
  setLoading,
  addModalTrailerVideo,
  resetTrailerVideo,
} = modalSlice.actions;
export default modalSlice.reducer;
