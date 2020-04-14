import { Reducer, Action } from "redux";
import { Movie } from "./dataTypes";
import _ from "lodash";
export interface MovieArrayState {
  movies: Movie[];
  favoritesIndex: number[];
}

type MovieArrayActionType =
  | "SET_MOVIE_ARRAY"
  | "SET_FAVORITES_INDEX"
  | "MARK_FAVORITE_MOVIE";

export interface MovieArrayActions extends Action<MovieArrayActionType> {
  payload: any;
}
const SetMovieArray = (movies: Movie[]): MovieArrayActions => ({
  type: "SET_MOVIE_ARRAY",
  payload: movies
});
const SetFavoritesIndexArray = (
  favoritesIndex: number[]
): MovieArrayActions => ({
  type: "SET_FAVORITES_INDEX",
  payload: favoritesIndex
});
const MarkFavoriteMovie = (movie: Movie): MovieArrayActions => ({
  type: "MARK_FAVORITE_MOVIE",
  payload: movie
});

export const Actions = {
  SetMovieArray,
  MarkFavoriteMovie,
  SetFavoritesIndexArray
};
////////////////////////////////////////////////////////////
const initialState: MovieArrayState = { movies: [], favoritesIndex: [] };
export const MovieArrayReducer: Reducer<MovieArrayState, MovieArrayActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_MOVIE_ARRAY":
      return { ...state, movies: action.payload };
    case "SET_FAVORITES_INDEX":
      return { ...state, favoritesIndex: action.payload };
    case "MARK_FAVORITE_MOVIE":
      let movie: Movie = action.payload;
      let index = _.findIndex(
        state.favoritesIndex,
        index => index === movie.id
      );
      let tmpState: number[] = [...state.favoritesIndex];
      if (index >= 0) {
        tmpState = _.filter(tmpState, index => index !== movie.id);
      } else {
        tmpState.push(movie.id);
      }
      return { ...state, favoritesIndex: tmpState };
    default:
      return state;
  }
};
