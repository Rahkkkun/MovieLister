import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.09] transition-all duration-300 text-white max-w-sm cursor-pointer">
      {/* Poster Image with Zoom on Hover */}
      <div className="overflow-hidden h-80">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : `/no-movie.png`
          }
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Movie Info */}
      <div className="p-5 flex flex-col justify-between h-44">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>

        <div className="flex items-center text-sm text-gray-300 gap-2 flex-wrap">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <img src="/star.svg" alt="Star Icon" className="w-4 h-4" />
            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
          </div>

          <span>•</span>

          {/* Language */}
          <span className="uppercase">{original_language}</span>

          <span>•</span>

          {/* Year */}
          <span>{release_date ? release_date.split("-")[0] : "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
