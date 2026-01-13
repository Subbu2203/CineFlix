import { useEffect, useState } from "react";
import { getMovies } from "../api/movies";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMovies()
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="home-container">
  <SearchBar onSearch={setSearch} />

  <div className="movies-grid">
    {loading
      ? Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      : movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
  </div>
</div>

    </>
  );
};

export default Home;
