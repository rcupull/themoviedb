export const apiKey = "970c5054399c03d475194ce863d7da52";

export const imagesURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
// export const imagesURL = "https://image.tmdb.org/t/p/w500/";

export const apiURL = "https://api.themoviedb.org/3";
export const apiAccessTokenV4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzBjNTA1NDM5OWMwM2Q0NzUxOTRjZTg2M2Q3ZGE1MiIsInN1YiI6IjVlNjBlNWUyNTVjOTI2MDAxNzU4YThiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9YAVYgZGr0bOjPk_HHx6rJ5P-9Pa_JWAoDjqX5UmfAA";

type typeWayToSearch = "/search" | "/discover" | "/find";
type media_type = "/movie" | "/tv" | "/all" | "/person";
type time_window = "/day" | "/week";
type sort_by = "/day" | "/week";

export const apiPathSearch = "/search";
export const apiPathTrending = "/trending";
export const apiPathDiscover = "/discover";
export const apiPathPopular = "/popular";

export const apiPathNewToken = "/authentication/token/new";
export const apiPathValidateToken = "/authentication/token/validate_with_login";
export const apiPathNewSession = "/authentication/session/new";
export const apiPathDeleteSession = "/authentication/session";

export const searchURL = `${apiURL}${apiPathSearch}/movie?api_key=${apiKey}`;
export const billboardURL = `${apiURL}${apiPathTrending}/movie/week?api_key=${apiKey}`;
export const popularURL = `${apiURL}${apiPathPopular}/movie/?api_key=${apiKey}`;
export const boyURL = `${apiURL}${apiPathPopular}/movie/?sort_by=popularity.asc&include_adult=false&with_genres=28&api_key=${apiKey}`;

export const markAsFavoriteURL = `${apiURL}/account/{account_id}/favorite`;

//////////////////////////////////////////////////////////////
export interface RequestParamsInterface {
  method: "get" | "post" | "delete";
  URL: string;
  params: object;
  data: object;
}
const BillboardMovieParams: RequestParamsInterface = {
  method: "get",
  URL: `${apiURL}${apiPathTrending}/movie/week`,
  params: { api_key: apiKey },
  data: {}
};
const PopularMovieParams: RequestParamsInterface = {
  method: "get",
  URL: `${apiURL}${apiPathDiscover}/movie`,
  params: { api_key: apiKey, sort_by: "popularity.asc", include_video: false },
  data: {}
};
const BoyMovieParams: RequestParamsInterface = {
  method: "get",
  URL: `${apiURL}${apiPathDiscover}/movie`,
  params: {
    api_key: apiKey,
    sort_by: "popularity.asc",
    include_adult: false,
    with_genres: 28
  },
  data: {}
};

const FavoriteMovieParams: RequestParamsInterface = {
  method: "get",
  URL: `${apiURL}/account/{account_id}/favorite/movies`,
  params: {
    api_key: apiKey,
    language: "en-US",
    sort_by: "created_at.asc"
  },
  data: {}
};

const SearchMovieParams: RequestParamsInterface = {
  method: "get",
  URL: `${apiURL}${apiPathSearch}/movie`,
  params: { api_key: apiKey },
  data: {}
};

export const MovieParams = {
  billboard: BillboardMovieParams,
  popular: PopularMovieParams,
  boy: BoyMovieParams,
  search: SearchMovieParams,
  favorites: FavoriteMovieParams
};
