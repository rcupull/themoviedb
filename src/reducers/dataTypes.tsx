export interface Movie {
  popularity: number | null;
  id: number;
  video: boolean | null;
  vote_count: number | null;
  vote_average: number | null;
  title: string | null;
  release_date: string | null;
  original_language: string | null;
  original_title: string | null;
  genre_ids: number[] | null;
  backdrop_path: string | null;
  adult: boolean | null;
  overview: string | null;
  poster_path: string | null;
}

// export interface Movie {
//   movieMetadata: MovieMetadata;
//   // isfavorite: boolean;
//   // ID: number;
// }
