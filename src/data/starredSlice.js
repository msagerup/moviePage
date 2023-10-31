import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
  name: "starred",
  initialState: {
    starredMovies: [],
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unStarMovie: (state, action) => {
      state.starredMovies = state.starredMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
