export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
}

export interface MovieDetail extends Movie {
  release_date?: string;
  genres?: Genre[];
}
