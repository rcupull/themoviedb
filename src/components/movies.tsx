import React, { useState, useEffect } from "react";
import NavBar from "../presentational/navbar";
import { AuthContext, AuthParamsInterface } from "../components/authContext";
import Login from "../presentational/login";
import NoResultsPage from "../presentational/noResultsPage";
import SessionDependentRoute from "./sessionDependentRoute";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  BillboardMovieParams,
  PopularMovieParams,
  BoyMovieParams,
  SearchMovieParams,
  GetFavoriteMovieParams
} from "../service/apiData";
import StandardPage from "../presentational/page";
import { nameSessionData } from "../service/session";
import { Container, Row, Col } from "react-bootstrap";
import { mainContainerStyle } from "../components/stylesComponents";
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
  ID: number;
}

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

  ///////////////////////////////Load LocalStorage//////////////////////////////////////////////
  useEffect(() => {
    let data = localStorage.getItem(nameSessionData);
    if (data) setAuthParams(JSON.parse(data));
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentPageSearch(1);
  }, [query]);

  ///////////////////////////////////////////////////////////////////////////////////////////////
  const handleSetSession = (params: AuthParamsInterface) => {
    params.session_id
      ? localStorage.setItem(nameSessionData, JSON.stringify(params))
      : localStorage.removeItem(nameSessionData);

    setAuthParams(params);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <AuthContext.Provider
      value={{ params: authParams, setParams: handleSetSession }}
    >
      <BrowserRouter>
        <NavBar handleSearch={setQuery} />
        <Row>
          <Col sm={3}>
            <Login />
          </Col>
          <Col sm={8}>
            <Container style={mainContainerStyle}>
              <Switch>
                <Route path="/billboard">
                  <StandardPage
                    requestParams={BillboardMovieParams}
                    pageTitle={"Billboard"}
                    currentPage={currentPageBillboard}
                    showFavoriteCmpBasicInf={false}
                    handleChangeCurrentPage={setCurrentPageBillboard}
                  />
                </Route>
                <Route path="/popular">
                  <StandardPage
                    requestParams={PopularMovieParams}
                    pageTitle={"Popular"}
                    currentPage={currentPagePopular}
                    showFavoriteCmpBasicInf={false}
                    handleChangeCurrentPage={setCurrentPagePopular}
                  />
                </Route>
                <Route path="/boy">
                  <StandardPage
                    requestParams={BoyMovieParams}
                    pageTitle={"Boy"}
                    currentPage={currentPageBoy}
                    showFavoriteCmpBasicInf={false}
                    handleChangeCurrentPage={setCurrentPageBoy}
                  />
                </Route>
                <Route path="/search">
                  <StandardPage
                    requestParams={SearchMovieParams}
                    pageTitle={"Search"}
                    currentPage={currentPageSearch}
                    showFavoriteCmpBasicInf={false}
                    handleChangeCurrentPage={setCurrentPageSearch}
                    query={query}
                  />
                </Route>
                <SessionDependentRoute path="/favorite">
                  <StandardPage
                    requestParams={GetFavoriteMovieParams}
                    pageTitle={"Favorite"}
                    currentPage={currentPageFavorite}
                    showFavoriteCmpBasicInf={true}
                    handleChangeCurrentPage={setCurrentPageFavorite}
                  />
                </SessionDependentRoute>

                <Route path="/nomovies" component={NoResultsPage} />
                <Redirect to="/billboard" />
              </Switch>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Movies;
