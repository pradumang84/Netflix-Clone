import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerMovie = useSelector(
    (store) => store.movie.trailerMovie
  );

  useMovieById(movieId);

  if (!trailerMovie?.key) {
    return <p>Trailer not found</p>;
  }

  return (
    <div className="w-full overflow-hidden">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerMovie.key}?autoplay=1&mute=1&controls=0&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoBackground;