import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {
      results: [],
      totalPages: 0,
    },
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        // We need to do this, to display the "search" as we get a new set of data, where the page will be 1.
        if (action.payload.page === 1) {
          state.movies.results = [...action.payload.results];
        } else {
          // Filter out duplicates if there are any.
          const newMovies = action.payload.results.filter(
            (newMovie) =>
              !state.movies.results.some(
                (existingMovie) => existingMovie.id === newMovie.id
              )
          );
          state.movies.results = [...state.movies.results, ...newMovies];
        }

        state.movies.totalPages = action.payload.total_pages;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice;
