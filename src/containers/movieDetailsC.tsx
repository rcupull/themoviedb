import MovieDetails, {
  MovieDetailsStateProps,
  MovieDetailsOwnProps,
  MovieDetailsDispatchProps
} from "../presentational/movieDetails";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootReducerState } from "../reducers/rootReducer";

const MapStateToPropsInside: MapStateToProps<
  MovieDetailsStateProps,
  MovieDetailsOwnProps,
  RootReducerState
> = state => ({ session_id: state.auth.session_id });

const MapDispatchToPropsInside: MapDispatchToProps<
  MovieDetailsDispatchProps,
  MovieDetailsOwnProps
> = dispatch => ({});

export default connect(
  MapStateToPropsInside,
  MapDispatchToPropsInside
)(MovieDetails);
