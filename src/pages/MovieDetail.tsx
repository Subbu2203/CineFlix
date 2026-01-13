import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieDetail } from "../types/movie";
import { useWatchlist } from "../context/WatchlistContext";
import "../styles/movieDetails.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist } = useWatchlist(); // ✅ CONTEXT
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="detail-container">
      {/* LEFT : POSTER */}
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      {/* RIGHT : DETAILS */}
      <div className="movie-info">
        <h1>{movie.title}</h1>

        <div className="divider"></div>

        <div className="meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>

          <span>
            • {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </span>

          <span>
            • {movie.genres && movie.genres.length > 0
              ? movie.genres.map((g) => g.name).join(", ")
              : "No genres"}
          </span>
        </div>

        <p className="overview">{movie.overview}</p>

        <div className="actions">
          {/* ✅ FIXED BUTTON */}
          <button
            className="primary"
            onClick={() => addToWatchlist(movie)}
          >
            ❤️ Add to Watchlist
          </button>

          <button className="secondary" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
