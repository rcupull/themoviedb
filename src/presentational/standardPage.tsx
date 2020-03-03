import React, { useState, useEffect, Fragment } from "react";

import { Movie } from "../components/movies";
import ListMovies from "./listMovies";
import axios from "axios";
import { ToMovies } from "../utils/movieUtils";

import { PageContext } from "../components/pageContext";
import { useMovieSysContext } from "../components/movieSysContext";
import {
  getFavoriteAllIndex,
  insertFavorite,
  deleteFavorite
} from "../service/movieDB";

import Pagination from "./pagination";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailMovieInformation from "../presentational/detailInformation";

export interface StandardPageProps {
  pageTitle: string;
  showFavoriteCmp: boolean;
  api_URL: string;
  currentPage: number;
  handleChangeCurrentPage: (page: number) => void;
  query?: string;
}

const StandardPage: React.SFC<StandardPageProps> = ({
  pageTitle,
  showFavoriteCmp,
  api_URL,
  currentPage,
  handleChangeCurrentPage,
  query
}) => {
  const { path } = useRouteMatch();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const { favoriteIndexURL, useLocalStorageAsDB } = useMovieSysContext();

  // //////////////////////////////////////////////////////////////////////////////////////////

  const getMovie = (
    api_URL: string,
    page: number,
    predicate: number[] | boolean,
    query?: string
  ) => {
    let params =
      typeof query === "undefined"
        ? { page: page }
        : { page: page, query: query };

    axios
      .get(api_URL, {
        params: params
      })
      .then(res => {
        if (res.status === 200) {
          setError(false);
          setTotalPages(res.data.total_pages);
          setAllMovies(ToMovies(res.data.results, predicate));
        } else {
          setError(true);
        }
      })
      .catch(error => {
        setError(true);
      });
  };

  useEffect(() => {
    if (useLocalStorageAsDB) {
      getMovie(api_URL, currentPage, getFavoriteAllIndex(), query);
    } else {
      axios
        .get(favoriteIndexURL ? favoriteIndexURL : "")
        .then(res => {
          if (res.status === 200) {
            getMovie(api_URL, currentPage, res.data, query);
          } else {
            setError(true);
          }
        })
        .catch(error => {
          setError(true);
        });
    }
  }, [api_URL, currentPage, favoriteIndexURL, query, useLocalStorageAsDB]);

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
    if (useLocalStorageAsDB) {
      if (action === "insert") {
        insertFavorite(movie);
        changeFavoriteMovieInArray(movie, true);
      } else {
        deleteFavorite(movie);
        changeFavoriteMovieInArray(movie, false);
      }
    } else {
      axios
        .post("http://localhost:8888/" + action, {
          movieMetadata: movie.movieMetadata
        })
        .then(res => {
          if (res.status === 200) {
            changeFavoriteMovieInArray(
              movie,
              action === "insert" ? true : false
            );
          } else {
            setError(true);
          }
        })
        .catch(error => {
          setError(true);
        });
    }
  };

  const handleFavoriteChange = (movie: Movie) => {
    movie.isfavorite
      ? handleFavoriteInsertDeleteDB(movie, "delete")
      : handleFavoriteInsertDeleteDB(movie, "insert");
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const showBodyPage = () => {
    return (
      <Switch>
        <Route exact path={path}>
          <ListMovies movies={allMovies} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangeCurrentPage={handleChangeCurrentPage}
          />
        </Route>

        <Route path={path + "/:id"} component={DetailMovieInformation} />
      </Switch>
    );
  };

  return (
    <PageContext.Provider
      value={{
        showFavoriteCmp: showFavoriteCmp,
        handleFavoriteChange: handleFavoriteChange
      }}
    >
      <Fragment>
        <h1>{pageTitle}</h1>
        {error ? (
          <h4>Offline</h4>
        ) : query === "" ? (
          <h4>{"<<Write a valid search pattern>>"}</h4>
        ) : (
          showBodyPage()
        )}
      </Fragment>
    </PageContext.Provider>
  );
};

export default StandardPage;
