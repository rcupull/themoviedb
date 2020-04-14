import * as React_Redux from "react-redux";
import MovieAbstract, {
  MovieAbstractStateProps,
  MovieAbstractDispatchProps,
  MovieAbstractOwnProps
} from "../presentational/movieAbstract";
import { RootReducerState } from "../reducers/rootReducer";

const MapStateToProps: React_Redux.MapStateToProps<
  MovieAbstractStateProps,
  MovieAbstractOwnProps,
  RootReducerState
> = state => ({});

const MapDispatchToProps: React_Redux.MapDispatchToProps<
  MovieAbstractDispatchProps,
  MovieAbstractOwnProps
> = dispatch => ({});

export default React_Redux.connect(
  MapStateToProps,
  MapDispatchToProps
)(MovieAbstract);
