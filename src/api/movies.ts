import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getMovies = async (): Promise<Movie[]> => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res.data.results;
};
