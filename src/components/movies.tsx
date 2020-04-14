import React, { useState, useEffect } from "react";
import NavBar from "../presentational/navbar";
import Login from "../presentational/login";
import NoResultsPage from "../presentational/noResultsPage";
import SessionDependentRoute from "./privateRoute";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MovieParams } from "../service/apiData";
import Page from "../presentational/page";
import { GetAllFavoriteIndex } from "../service/apiUtils";
import { Container, Row, Col } from "react-bootstrap";
import { mainContainerStyle } from "../components/stylesComponents";

import { useDispatch, useSelector } from "react-redux";
import { Actions, RootReducerState } from "../reducers/rootReducer";

export interface MoviesStateProps {}
export interface MoviesDispatchProps {}
export interface MoviesOwnProps {}

type MoviesProps = MoviesStateProps & MoviesDispatchProps & MoviesOwnProps;

const Movies: React.SFC<MoviesProps> = () => {
  const dispatch = useDispatch();
  const session_id = useSelector(
    (state: RootReducerState) => state.auth.session_id
  );
  ///////////////////////////////Load LocalStorage//////////////////////////////////////////////
  useEffect(() => {
    dispatch(Actions.CheckSessionCreatedAction());
  }, [dispatch]);

  useEffect(() => {
    if (session_id === "") {
      dispatch(Actions.SetFavoritesIndexArray([]));
    } else {
      GetAllFavoriteIndex(session_id, (indexArray: number[]) => {
        dispatch(Actions.SetFavoritesIndexArray(indexArray));
      });
    }
  }, [dispatch, session_id]);

  return (
    <BrowserRouter>
      <NavBar />
      <Row>
        <Col sm={3}>
          <Login />
        </Col>
        <Col sm={8}>
          <Container style={mainContainerStyle}>
            <Switch>
              <Route path="/billboard">
                <Page
                  requestParams={MovieParams.billboard}
                  pageTitle={"Billboard"}
                  currentPage={useSelector(
                    (state: RootReducerState) => state.currentPage.billboard
                  )}
                  showFavoriteInAbstract={false}
                  handleChangeCurrentPage={(page: number) => {
                    dispatch(Actions.SetCurrentPageAction("BILLBOARD", page));
                  }}
                />
              </Route>
              <Route path="/popular">
                <Page
                  requestParams={MovieParams.popular}
                  pageTitle={"Popular"}
                  currentPage={useSelector(
                    (state: RootReducerState) => state.currentPage.popular
                  )}
                  showFavoriteInAbstract={false}
                  handleChangeCurrentPage={(page: number) => {
                    dispatch(Actions.SetCurrentPageAction("POPULAR", page));
                  }}
                />
              </Route>
              <Route path="/boy">
                <Page
                  requestParams={MovieParams.boy}
                  pageTitle={"Boy"}
                  currentPage={useSelector(
                    (state: RootReducerState) => state.currentPage.boy
                  )}
                  showFavoriteInAbstract={false}
                  handleChangeCurrentPage={(page: number) => {
                    dispatch(Actions.SetCurrentPageAction("BOY", page));
                  }}
                />
              </Route>
              <Route path="/search">
                <Page
                  requestParams={MovieParams.search}
                  pageTitle={"Search"}
                  currentPage={useSelector(
                    (state: RootReducerState) => state.currentPage.search
                  )}
                  showFavoriteInAbstract={false}
                  handleChangeCurrentPage={(page: number) => {
                    dispatch(Actions.SetCurrentPageAction("SEARCH", page));
                  }}
                  query={useSelector((state: RootReducerState) => state.query)}
                />
              </Route>
              <SessionDependentRoute path="/favorite">
                <Page
                  requestParams={MovieParams.favorites}
                  pageTitle={"Favorites"}
                  currentPage={useSelector(
                    (state: RootReducerState) => state.currentPage.favorite
                  )}
                  showFavoriteInAbstract={true}
                  handleChangeCurrentPage={(page: number) => {
                    dispatch(Actions.SetCurrentPageAction("FAVORITE", page));
                  }}
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
  );
};

export default Movies;
