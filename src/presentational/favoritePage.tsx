import React, { useState, useEffect, Fragment } from "react";

import { Movie } from "../components/movies";
import ListMovies from "./listMovies";
import { ToMovies } from "../utils/movieUtils";

import { PageContext } from "../components/pageContext";
import {
  getFavoritesMovies,
  deleteFavorite,
  insertFavorite
} from "../service/movieDB";

import Pagination from "./pagination";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailMovieInformation from "../presentational/detailInformation";

export interface FavoritePageProps {
  pageTitle: string;
  showFavoriteCmp: boolean;
}

const FavoritePage: React.SFC<FavoritePageProps> = ({
  pageTitle,
  showFavoriteCmp
}) => {
  const { path } = useRouteMatch();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  // //////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setAllMovies(ToMovies(getFavoritesMovies().results, true));
  }, [pageTitle]); //

  ////////////////////////////Favorites functions//////////////////////////////////////////////

  const changeFavoriteMovieInArray = (movie: Movie, isfavorite: boolean) => {
    let tmpArrayMovies: Movie[] = [...allMovies];
    let id = movie.movieMetadata.id;
    for (let index = 0; index < tmpArrayMovies.length; index++) {
      if (tmpArrayMovies[index].movieMetadata.id === id) {
        tmpArrayMovies[index].isfavorite = isfavorite;
        break;
      }
    }
    setAllMovies(tmpArrayMovies);
  };

  const handleFavoriteInsertDeleteDB = (
    movie: Movie,
    action: "delete" | "insert"
  ) => {
    if (action === "insert") {
      insertFavorite(movie);
      changeFavoriteMovieInArray(movie, true);
    } else {
      deleteFavorite(movie);
      changeFavoriteMovieInArray(movie, false);
    }
  };

  const handleFavoriteChange = (movie: Movie) => {
    movie.isfavorite
      ? handleFavoriteInsertDeleteDB(movie, "delete")
      : handleFavoriteInsertDeleteDB(movie, "insert");
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <PageContext.Provider
      value={{
        showFavoriteCmp: showFavoriteCmp,
        handleFavoriteChange: handleFavoriteChange
      }}
    >
      <Fragment>
        <h1>{pageTitle}</h1>
        <Switch>
          <Route exact path={path}>
            <ListMovies movies={allMovies} />
            <Pagination
              currentPage={1}
              totalPages={1}
              handleChangeCurrentPage={() => {}}
            />
          </Route>

          <Route path={path + "/:id"} component={DetailMovieInformation} />
        </Switch>
      </Fragment>
    </PageContext.Provider>
  );
};

export default FavoritePage;
