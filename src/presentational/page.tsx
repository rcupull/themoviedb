import React, { useState, useEffect, Fragment } from "react";

import { Movie } from "../components/movies";
import ListMovies from "./listMovies";
import { ToMovies } from "../utils/movieUtils";
import { PageContext } from "../components/pageContext";
import _ from "lodash";
import Pagination from "./pagination";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import DetailMovieInformation from "./detailInformation";
import { RequestParamsInterface } from "../service/apiData";
import {
  MarkAsFavorite,
  data_MarkAsFavoriteInterface,
  GetStandarPage,
  GetSearchPage
} from "../service/apiUtils";

import { GetAllFavoriteIndex } from "../service/apiUtils";
import { useAuthContext } from "../components/authContext";

export interface StandardPageProps {
  requestParams: RequestParamsInterface;
  pageTitle: string;
  showFavoriteCmpBasicInf: boolean;
  currentPage: number;
  handleChangeCurrentPage: (page: number) => void;
  query?: string; //only is used in Search page
}

const StandardPage: React.SFC<StandardPageProps> = ({
  requestParams,
  pageTitle,
  showFavoriteCmpBasicInf,
  currentPage,
  handleChangeCurrentPage,
  query
}) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [allFavoriteIndex, setAllFavoriteIndex] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  /////////////////////////////////////////////////////////////////////////////////////
  const session_id = useAuthContext().params.session_id;
  const { path } = useRouteMatch();
  ///////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (session_id) {
      const setFavoriteIndexArray = (indexArray: number[]) => {
        setAllFavoriteIndex(indexArray);
      };

      GetAllFavoriteIndex(session_id, setFavoriteIndexArray);
    }
  }, [session_id]);

  ///////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const successFunction = (res: any) => {
      if (res.status === 200) {
        setError(false);
        setTotalPages(res.data.total_pages);
        setAllMovies(
          ToMovies(
            res.data.results,
            allFavoriteIndex.length > 0 ? allFavoriteIndex : false
          )
        );
      }
    };
    const errorFunction = (res: any) => {
      console.log("error data request");
      setError(true);
    };

    if (typeof query !== "undefined") {
      GetSearchPage(
        requestParams,
        currentPage,
        query,
        successFunction,
        errorFunction
      );
    } else {
      GetStandarPage(
        requestParams,
        currentPage,
        successFunction,
        errorFunction,
        session_id
      );
    }
  }, [currentPage, requestParams, query, session_id, allFavoriteIndex]);

  const handleMarkAsFavorite = (movie: Movie) => {
    if (session_id === "" || !session_id) {
      console.log("sesion_id is required");
      return;
    }
    ///////
    const successFunction = (res: any) => {
      if (res.status === 201 || res.status === 200) {
        updateAllMoviesAndAllFavoriteIndex(movie);
      }
    };
    const updateAllMoviesAndAllFavoriteIndex = (movie: Movie) => {
      let tmpArrayMovies: Movie[] = [...allMovies];
      let tmpAllFavoriteIndex: number[] = [...allFavoriteIndex];

      if (movie.isfavorite) {
        tmpArrayMovies[movie.ID].isfavorite = false;
        tmpAllFavoriteIndex = _.filter(tmpAllFavoriteIndex, index => {
          return index !== movie.movieMetadata.id;
        });
      } else {
        tmpArrayMovies[movie.ID].isfavorite = true;
        tmpAllFavoriteIndex.push(movie.movieMetadata.id);
      }
      setAllFavoriteIndex(tmpAllFavoriteIndex);
      setAllMovies(tmpArrayMovies);
    };

    ///////
    const errorFunction = (res: any) => {
      console.log("error Favorite inserted");
    };
    ///////
    let data: data_MarkAsFavoriteInterface = {
      media_type: "movie",
      media_id: movie.movieMetadata.id,
      favorite: !movie.isfavorite
    };

    MarkAsFavorite(data, session_id, successFunction, errorFunction);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const renderDetail = (params: any) => {
    let id = parseInt(params.match.params.id);
    let movie = _.find(allMovies, movie => {
      return movie.movieMetadata.id === id;
    });

    return movie ? (
      <DetailMovieInformation movie={movie} />
    ) : (
      <Redirect to={path} />
    );
  };

  if (error) return <Redirect to="/nomovies" />;

  return (
    <PageContext.Provider
      value={{
        handleMarkAsFavorite: handleMarkAsFavorite,
        showFavoriteCmpBasicInf: showFavoriteCmpBasicInf
      }}
    >
      <Fragment>
        <h1>{pageTitle}</h1>
        <Switch>
          <Route exact path={path}>
            <ListMovies movies={allMovies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleChangeCurrentPage={handleChangeCurrentPage}
            />
          </Route>

          <Route path={path + "/:id"} render={params => renderDetail(params)} />
        </Switch>
      </Fragment>
    </PageContext.Provider>
  );
};

export default StandardPage;
