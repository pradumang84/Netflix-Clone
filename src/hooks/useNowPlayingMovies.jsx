import axios from "axios";
import { Now_Playing_Movie, options } from "../utils/constant";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMoviesData = async () => {
      try {
        const res = await axios.get(Now_Playing_Movie, options);

        dispatch(getNowPlayingMovies(res.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    getNowPlayingMoviesData();
  }, [dispatch]);
};

export default useNowPlayingMovies;