import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist(); // 👈 IMPORTANT

  if (watchlist.length === 0) {
    return <h2 style={{ padding: "40px" }}>Your Watchlist is empty ❤️</h2>;
  }

  return (
    <div className="home-container">
      <div className="movies-grid">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
