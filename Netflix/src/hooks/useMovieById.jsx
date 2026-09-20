import axios from "axios";
import { options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTrailerMovie } from "../redux/movieSlice";
import { useEffect } from "react";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );

        console.log("VIDEO RESULTS:", res.data.results);

        const trailer = res.data.results.filter(
          (item) =>
            item.type === "Trailer" &&
            item.site === "YouTube"
        );

        console.log("YOUTUBE TRAILER:", trailer);

        dispatch(
          getTrailerMovie(
            trailer.length > 0 ? trailer[0] : null
          )
        );
      } catch (error) {
        console.log("VIDEO API ERROR:", error);
      }
    };

    if (movieId) {
      getMovieById();
    }
  }, [movieId, dispatch]);
};

export default useMovieById;