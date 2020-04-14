import MovieDetails, {
  MovieDetailsStateProps,
  MovieDetailsOwnProps,
  MovieDetailsDispatchProps
} from "../presentational/movieDetails";
import * as React_Redux from "react-redux";
import { RootReducerState } from "../reducers/rootReducer";

const MapStateToProps: React_Redux.MapStateToProps<
  MovieDetailsStateProps,
  MovieDetailsOwnProps,
  RootReducerState
> = state => ({ session_id: state.auth.session_id });

const MapDispatchToProps: React_Redux.MapDispatchToProps<
  MovieDetailsDispatchProps,
  MovieDetailsOwnProps
> = dispatch => ({});

export default React_Redux.connect(
  MapStateToProps,
  MapDispatchToProps
)(MovieDetails);
