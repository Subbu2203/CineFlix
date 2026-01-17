import type { Movie } from "../types/movie";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWatchlist } from "../context/WatchlistContext";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { toggleWatchlist, watchlist } = useWatchlist();
  const navigate = useNavigate();

  const isAdded = watchlist.some((m) => m.id === movie.id);

  return (
    <motion.div
      className="movie-card-wrapper"
      whileHover={{ scale: 1.08 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* CARD CLICK → MOVIE DETAIL */}
      <Link to={`/movie/${movie.id}`} className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average.toFixed(1)}</p>
      </Link>

      {/* ❤️ WATCHLIST BUTTON */}
      <button
        className={`heart-btn ${isAdded ? "added" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWatchlist(movie);
        }}
      >
        {isAdded ? "❤️" : "🤍"}
      </button>

      {/* ▶ WATCH NOW BUTTON */}
      <button
        className="watch-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`/movie/${movie.id}`);
        }}
      >
        ▶ Watch Now
      </button>
    </motion.div>
  );
};

export default MovieCard;
