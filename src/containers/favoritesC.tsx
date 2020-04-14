import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { Movie } from "../reducers/dataTypes";
import Favorite, {
  FavoriteStateProps,
  FavoriteDispatchProps,
  FavoriteOwnProps
} from "../presentational/favorite";
import { RootReducerState } from "../reducers/rootReducer";
import { IsFavoriteMovie } from "../reducers/movieUtils";

const MapStateToPropsInside: MapStateToProps<
  FavoriteStateProps,
  FavoriteOwnProps,
  RootReducerState
> = (state, OwnProps) => {
  return {
    isFavorite: IsFavoriteMovie(OwnProps.movie, state.movies.favoritesIndex)
  };
};

const MapDispatchToPropsInside: MapDispatchToProps<
  FavoriteDispatchProps,
  FavoriteOwnProps
> = dispatch => {
  return {
    handleSetFavoriteMovie: (movie: Movie) => {}
  };
};

export default connect(
  MapStateToPropsInside,
  MapDispatchToPropsInside
)(Favorite);
