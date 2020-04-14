import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import MovieAbstract, {
  MovieAbstractStateProps,
  MovieAbstractDispatchProps,
  MovieAbstractOwnProps
} from "../presentational/movieAbstract";
import { RootReducerState } from "../reducers/rootReducer";

const MapStateToPropsInside: MapStateToProps<
  MovieAbstractStateProps,
  MovieAbstractOwnProps,
  RootReducerState
> = state => ({});

const MapDispatchToPropsInside: MapDispatchToProps<
  MovieAbstractDispatchProps,
  MovieAbstractOwnProps
> = dispatch => ({});

export default connect(
  MapStateToPropsInside,
  MapDispatchToPropsInside
)(MovieAbstract);
