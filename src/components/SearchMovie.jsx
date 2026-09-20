import React, { useState } from "react";
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector(
    (store) => store.app.isLoading
  );

  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!searchMovie.trim()) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await axios.get(
        `${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );

      const movies = res?.data?.results;

      dispatch(
        setSearchMovieDetails({
          searchMovie,
          movies,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }

    setSearchMovie("");
  };

  return (
    <>
      <div className="flex w-full justify-center pt-[10%]">
        <form
          onSubmit={submitHandler}
          className="w-[50%]"
        >
          <div className="flex w-full justify-between rounded-lg border-2 border-gray-200 p-2 shadow-md">
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full rounded-md bg-white text-lg outline-none"
              type="text"
              placeholder="Search Movies..."
            />

            <button
              type="submit"
              className="rounded-md bg-red-800 px-4 py-2 text-white"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {searchedMovie ? (
        <MovieList
          title={movieName}
          searchMovie={true}
          movies={searchedMovie}
        />
      ) : (
        <h1 className="text-white">Movie Not Found!!</h1>
      )}
    </>
  );
};

export default SearchMovie;
            