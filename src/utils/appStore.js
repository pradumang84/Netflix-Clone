import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux/userSlice";
import movieReducer from "../redux/movieSlice";
import searchReducer from "../redux/searchSlice";

const appStore = configureStore({
  reducer: {
    app: userReducer,
    movie: movieReducer,
    searchMovie: searchReducer,
  },
});

export default appStore;