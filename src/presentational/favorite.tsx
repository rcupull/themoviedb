import * as React from "react";

import {
  favoriteStylEnable,
  favoriteStylDisable
} from "../components/stylesComponents";
import { Movie } from "../components/movies";
import { usePageContext } from "../components/pageContext";
export interface FavoriteProps {
  movie: Movie;
}

const Favorite: React.SFC<FavoriteProps> = ({ movie }) => {
  const { handleMarkAsFavorite } = usePageContext();

  let classFavorite = movie.isfavorite ? "fa fa-star" : "fa fa-star-o";
  let favoriteStyle = movie.isfavorite
    ? favoriteStylEnable
    : favoriteStylDisable;
  return (
    <i
      style={favoriteStyle}
      onClick={() => {
        if (handleMarkAsFavorite) handleMarkAsFavorite(movie);
      }}
      className={classFavorite}
      aria-hidden="true"
    />
  );
};

export default Favorite;
