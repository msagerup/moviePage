import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, action) => {
      state.watchLaterMovies = state.watchLaterMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export default watchLaterSlice;
