import * as React from "react";
import {
  favoriteStylEnable,
  favoriteStylDisable
} from "../components/stylesComponents";
import { Movie } from "../reducers/dataTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerState, Actions } from "../reducers/rootReducer";
import {
  data_MarkAsFavoriteInterface,
  MarkAsFavorite
} from "../service/apiUtils";
export interface FavoriteOwnProps {
  movie: Movie;
}
export interface FavoriteDispatchProps {
  handleSetFavoriteMovie: (movie: Movie) => void;
}
export interface FavoriteStateProps {
  isFavorite: boolean;
}

type FavoriteProps = FavoriteOwnProps &
  FavoriteDispatchProps &
  FavoriteStateProps;

const Favorite: React.SFC<FavoriteProps> = ({
  movie,
  isFavorite,
  handleSetFavoriteMovie
}) => {
  const session_id = useSelector(
    (state: RootReducerState) => state.auth.session_id
  );
  const dispatch = useDispatch();
  const handleSetFavoriteMovieInto = (movie: Movie) => {
    if (session_id === "") {
      console.log("sesion_id is required");
      return;
    }
    ///////
    const successFunction = (res: any) => {
      if (res.status === 201 || res.status === 200) {
        dispatch(Actions.MarkFavoriteMovie(movie));
      }
    };
    const errorFunction = (res: any) => {
      console.log("error Favorite inserted");
    };
    ///////
    let data: data_MarkAsFavoriteInterface = {
      media_type: "movie",
      media_id: movie.id,
      favorite: !isFavorite
    };
    MarkAsFavorite(data, session_id, successFunction, errorFunction);
  };

  let classFavorite = isFavorite ? "fa fa-star" : "fa fa-star-o";
  let favoriteStyle = isFavorite ? favoriteStylEnable : favoriteStylDisable;
  return (
    <i
      style={favoriteStyle}
      onClick={() => {
        handleSetFavoriteMovieInto(movie);
      }}
      className={classFavorite}
      aria-hidden="true"
    />
  );
};

export default Favorite;
