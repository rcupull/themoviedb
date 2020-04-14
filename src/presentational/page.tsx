import React, { useState, useEffect, Fragment, useCallback } from "react";

import { Movie } from "../reducers/dataTypes";
import ListMovies from "./listMovies";
// import { PageContext } from "../components/pageContext";
import _ from "lodash";
import Pagination from "./pagination";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import MovieDetails from "../containers/movieDetailsC";
import { RequestParamsInterface } from "../service/apiData";
import {
  MarkAsFavorite,
  data_MarkAsFavoriteInterface,
  GetPage
} from "../service/apiUtils";

import { GetAllFavoriteIndex } from "../service/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { Actions, RootReducerState } from "../reducers/rootReducer";

export interface PageStateProps {}
export interface PageDispatchProps {
  handleChangeCurrentPage: (page: number) => void;
}
export interface PageOwnProps {
  requestParams: RequestParamsInterface;
  pageTitle: string;
  showFavoriteInAbstract: boolean;
  currentPage: number;
  query?: string;
}
type PageProps = PageStateProps & PageDispatchProps & PageOwnProps;

const StandardPage: React.SFC<PageProps> = ({
  requestParams,
  pageTitle,
  showFavoriteInAbstract,
  currentPage,
  handleChangeCurrentPage,
  query
}) => {
  /////////////////////////////////////////////////////////////////////////////////////
  // const session_id = useAuthContext().params.session_id;
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const movies: Movie[] = useSelector(
    (state: RootReducerState) => state.movies.movies
  );
  const favoritesIndex: number[] = useSelector(
    (state: RootReducerState) => state.movies.favoritesIndex
  );

  // const query: string = useSelector((state: RootReducerState) => state.query);
  const error: boolean = useSelector((state: RootReducerState) => state.error);
  const totalPages: number = useSelector(
    (state: RootReducerState) => state.pagesAmount
  );
  const session_id = useSelector(
    (state: RootReducerState) => state.auth.session_id
  );
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (session_id) {

  //     const setFavoriteIndexArray = (indexArray: number[]) => {
  //       handleSetFavoritesIndex(indexArray);
  //     };

  //     GetAllFavoriteIndex(session_id, setFavoriteIndexArray);
  //   }
  // }, [session_id, handleSetFavoritesIndex]);

  ///////////////////////////////////////////////////////////////////////////////
  // const memoizedGetStandarPage = useCallback(() => {
  //   const successFunction = (res: any) => {
  //     if (res.status === 200) {
  //       dispatch(Actions.ClearErrorAction());
  //       dispatch(Actions.SetPagesAmountAction(res.data.total_pages));
  //       dispatch(Actions.SetMovieArray(res.data.result));
  //       // handleSetMovieArray(
  //       //   ToMovies(
  //       //     res.data.results,
  //       //     favoritesIndex.length > 0 ? favoritesIndex : false
  //       //   )
  //       // );
  //     }
  //   };
  //   const errorFunction = (res: any) => {
  //     console.log("error data request");
  //     dispatch(Actions.SetErrorAction());
  //   };

  //   GetStandarPage(
  //     requestParams,
  //     currentPage,
  //     successFunction,
  //     errorFunction,
  //     session_id
  //   );
  // }, [requestParams, currentPage, dispatch, session_id]);

  useEffect(() => {
    const successFunction = (res: any) => {
      if (res.status === 200) {
        dispatch(Actions.ClearErrorAction());
        dispatch(Actions.SetPagesAmountAction(res.data.total_pages));
        dispatch(Actions.SetMovieArray(res.data.results));
      }
    };
    const errorFunction = (res: any) => {
      console.log("error data request");
      dispatch(Actions.SetErrorAction());
    };

    GetPage(requestParams, currentPage, successFunction, errorFunction, {
      query: typeof query === "undefined" ? undefined : query,
      session_id: session_id
    });
  }, [dispatch, requestParams, currentPage, session_id, query, favoritesIndex]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const renderDetail = (params: any) => {
    let id = parseInt(params.match.params.id);
    let movie = _.find(movies, movie => {
      return movie.id === id;
    });

    return movie ? <MovieDetails movie={movie} /> : <Redirect to={path} />;
  };

  if (error) return <Redirect to="/nomovies" />;

  return (
    <Fragment>
      <h1>{pageTitle}</h1>
      <Switch>
        <Route exact path={path}>
          <ListMovies
            movies={movies}
            showFavoriteComponent={showFavoriteInAbstract}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangeCurrentPage={handleChangeCurrentPage}
          />
        </Route>

        <Route path={path + "/:id"} render={params => renderDetail(params)} />
      </Switch>
    </Fragment>
  );
};

export default StandardPage;
