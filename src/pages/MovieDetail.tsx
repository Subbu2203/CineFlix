import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieDetail } from "../types/movie";
import { useWatchlist } from "../context/WatchlistContext";
import "../styles/movieDetails.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist } = useWatchlist();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);

  // ✅ ONE useEffect – ALL API calls here
  useEffect(() => {
    // Movie details
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((res) => setMovie(res.data))
      .catch(console.error);

    // 🔥 Similar movies
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      })
      .then((res) => setSimilarMovies(res.data.results.slice(0, 6)))
      .catch(console.error);
  }, [id]);

  // ✅ return AFTER all hooks
  if (!movie) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="detail-container">
      {/* LEFT */}
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      {/* RIGHT */}
      <div className="movie-info">
        <h1>{movie.title}</h1>

        <div className="divider"></div>

        <div className="meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>• {movie.release_date?.slice(0, 4) || "N/A"}</span>
          <span>
            • {movie.genres?.map((g) => g.name).join(", ") || "No genres"}
          </span>
        </div>

        <p className="overview">{movie.overview}</p>

        <div className="actions">
          <button className="primary" onClick={() => addToWatchlist(movie)}>
            ❤️ Add to Watchlist
          </button>

          <button className="secondary" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>

        {/* 🔥 MORE LIKE THIS */}
        {similarMovies.length > 0 && (
          <div className="similar-section">
            <h2>More Like This</h2>

            <div className="similar-grid">
              {similarMovies.map((m) => (
                <img
                  key={m.id}
                  src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                  alt={m.title}
                  onClick={() => navigate(`/movie/${m.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;