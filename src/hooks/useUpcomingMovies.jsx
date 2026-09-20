import axios from "axios";
import { Upcoming_Movie, options } from "../utils/constant";
import { getUpcomingMovie } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const res = await axios.get(Upcoming_Movie, options);

        dispatch(getUpcomingMovie(res.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    getUpcomingMovies();
  }, [dispatch]);
};

export default useUpcomingMovies;