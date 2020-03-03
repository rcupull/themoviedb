import * as React from "react";

import {
  favoriteStylEnable,
  favoriteStylDisable
} from "../components/stylesComponents";
export interface FavoriteProps {
  active: boolean;
  setActive: () => void;
}

const Favorite: React.SFC<FavoriteProps> = ({ active, setActive }) => {
  let classFavorite = active ? "fa fa-star" : "fa fa-star-o";
  let favoriteStyle = active ? favoriteStylEnable : favoriteStylDisable;
  return (
    <i
      style={favoriteStyle}
      onClick={() => {
        setActive();
      }}
      className={classFavorite}
      aria-hidden="true"
    />
  );
};

export default Favorite;
