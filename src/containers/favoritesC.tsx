import * as React_Redux from "react-redux";
import { Movie } from "../reducers/dataTypes";
import Favorite, {
  FavoriteStateProps,
  FavoriteDispatchProps,
  FavoriteOwnProps
} from "../presentational/favorite";
import { RootReducerState } from "../reducers/rootReducer";
import { IsFavoriteMovie } from "../reducers/movieUtils";

const MapStateToProps: React_Redux.MapStateToProps<
  FavoriteStateProps,
  FavoriteOwnProps,
  RootReducerState
> = (state, OwnProps) => {
  return {
    isFavorite: IsFavoriteMovie(OwnProps.movie, state.movies.favoritesIndex)
  };
};

const MapDispatchToProps: React_Redux.MapDispatchToProps<
  FavoriteDispatchProps,
  FavoriteOwnProps
> = dispatch => {
  return {
    handleSetFavoriteMovie: (movie: Movie) => {}
  };
};

export default React_Redux.connect(
  MapStateToProps,
  MapDispatchToProps
)(Favorite);
