import React, { useState, useEffect } from "react";
import NavBar from "../presentational/navbar";
import { AuthContext, AuthParamsInterface } from "../components/authContext";
import Login from "../presentational/login";
import SessionDependentRoute from "./sessionDependentRoute";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  BillboardMovieParams,
  PopularMovieParams,
  BoyMovieParams,
  SearchMovieParams,
  GetFavoriteMovieParams
} from "../service/apiData";
import StandardPage from "../presentational/standardPage";

import { Container, Row, Col } from "react-bootstrap";

export enum MovieTypes {
  billboard,
  popular,
  boy,
  favorites
}

export interface MovieMetadata {
  popularity: number | null;
  id: number;
  video: boolean | null;
  vote_count: number | null;
  vote_average: number | null;
  title: string | null;
  release_date: string | null;
  original_language: string | null;
  original_title: string | null;
  genre_ids: number[] | null;
  backdrop_path: string | null;
  adult: boolean | null;
  overview: string | null;
  poster_path: string | null;
}

export interface Movie {
  movieMetadata: MovieMetadata;
  isfavorite: boolean;
}

const favoriteIndexURL = "http://localhost:8888/favorite-index";

const useLocalStorageAsDB = true; //For use LocalStorage as DB

export interface MoviesProps {}

export interface MoviesState {
  ///////////////////////////////////
  currentPageBillboard: number;
  currentPagePopular: number;
  currentPageBoy: number;
  currentPageFavorite: number;
  showFavoriteCmpInBasicInformation: boolean;
  query: string;
  //////////////////////////////////
}

export interface MoviesProps {}

const Movies: React.SFC<MoviesProps> = () => {
  const [authParams, setAuthParams] = useState<AuthParamsInterface>({
    session_id: "",
    request_token: ""
  });

  const [currentPageBillboard, setCurrentPageBillboard] = useState<number>(1);
  const [currentPagePopular, setCurrentPagePopular] = useState<number>(1);
  const [currentPageBoy, setCurrentPageBoy] = useState<number>(1);
  const [currentPageFavorite, setCurrentPageFavorite] = useState<number>(1);
  const [currentPageSearch, setCurrentPageSearch] = useState<number>(1);

  const [query, setQuery] = useState<string>("");

  /////////////////////Working with localStorage as DB//////////////////

  const handleSetSession = (params: AuthParamsInterface) => {
    setAuthParams(params);
  };

  // useEffect(() => {
  //   if (useLocalStorageAsDB) loadDefaultDBInLocalStorage();
  // }, []);

  useEffect(() => {
    console.log("authParams", authParams);
  }, [authParams]);

  // let a = AuthSession(
  //   { params: authParams, setParams: setAuthParams },
  //   "rcupull",
  //   "123"
  // );

  // console.log("a", a);

  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentPageSearch(1);
  }, [query]);

  return (
    <AuthContext.Provider
      value={{ params: authParams, setParams: handleSetSession }}
    >
      <BrowserRouter>
        <NavBar handleSearchMovies={setQuery} />
        <Row>
          <Col xs={2}>
            <Container></Container>
          </Col>
          <Col>
            <Container>
              <Switch>
                <Route path="/billboard">
                  <StandardPage
                    requestParams={BillboardMovieParams}
                    pageTitle={"Billboard"}
                    currentPage={currentPageBillboard}
                    showFavoriteCmp={false}
                    handleChangeCurrentPage={setCurrentPageBillboard}
                  />
                </Route>
                <Route path="/popular">
                  <StandardPage
                    requestParams={PopularMovieParams}
                    pageTitle={"Popular"}
                    currentPage={currentPagePopular}
                    showFavoriteCmp={false}
                    handleChangeCurrentPage={setCurrentPagePopular}
                  />
                </Route>
                <Route path="/boy">
                  <StandardPage
                    requestParams={BoyMovieParams}
                    pageTitle={"Boy"}
                    currentPage={currentPageBoy}
                    showFavoriteCmp={false}
                    handleChangeCurrentPage={setCurrentPageBoy}
                  />
                </Route>
                <Route path="/search">
                  <StandardPage
                    requestParams={SearchMovieParams}
                    pageTitle={"Search"}
                    currentPage={currentPageSearch}
                    showFavoriteCmp={false}
                    handleChangeCurrentPage={setCurrentPageSearch}
                    query={query}
                  />
                </Route>
                <SessionDependentRoute path="/favorite">
                  <StandardPage
                    requestParams={GetFavoriteMovieParams}
                    pageTitle={"Favorite"}
                    currentPage={currentPageFavorite}
                    showFavoriteCmp={true}
                    handleChangeCurrentPage={setCurrentPageFavorite}
                  />
                </SessionDependentRoute>

                {/* {useLocalStorageAsDB ? (
                    <Route path="/favorite">
                      <FavoritePage
                        pageTitle={"Favorite"}
                        showFavoriteCmp={true}
                      />
                    </Route>
                  ) : (
                    <Route path="/favorite">
                      <StandardPage
                        pageTitle={"Favorites"}
                        api_URL={favoriteURL}
                        currentPage={currentPageFavorite}
                        showFavoriteCmp={true}
                        handleChangeCurrentPage={setCurrentPageFavorite}
                      />
                    </Route>
                  )} */}
                {/* <Route path="/search">
                    <StandardPage
                      pageTitle={"Search"}
                      api_URL={searchURL}
                      currentPage={currentPageSearch}
                      showFavoriteCmp={false}
                      handleChangeCurrentPage={setCurrentPageSearch}
                      query={query}
                    />
                  </Route> */}
                <Redirect to="/billboard" />
              </Switch>
            </Container>
          </Col>
          <Col xs={2}>
            <Login />
          </Col>
        </Row>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Movies;
