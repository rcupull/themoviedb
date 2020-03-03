import React, { useState, useEffect } from "react";
import NavBar from "../presentational/navbar";
import { loadDefaultDBInLocalStorage } from "../service/movieDB";

import { MovieSysContext } from "../components/movieSysContext";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import StandardPage from "../presentational/standardPage";
import FavoritePage from "../presentational/favoritePage";

import { Container } from "react-bootstrap";

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

const imagesURL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=45bf6592c14a965b33549f4cc7e6c664";

const billboardURL =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=45bf6592c14a965b33549f4cc7e6c664";
const popularURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=45bf6592c14a965b33549f4cc7e6c664&sort_by=popularity.asc&include_video=false";
const boyURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=45bf6592c14a965b33549f4cc7e6c664&sort_by=popularity.asc&include_adult=false&with_genres=28";

const favoriteURL = "http://localhost:8888/favorite-meta";
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
  const [currentPageBillboard, setCurrentPageBillboard] = useState<number>(1);
  const [currentPagePopular, setCurrentPagePopular] = useState<number>(1);
  const [currentPageBoy, setCurrentPageBoy] = useState<number>(1);
  const [currentPageFavorite, setCurrentPageFavorite] = useState<number>(1);
  const [currentPageSearch, setCurrentPageSearch] = useState<number>(1);

  const [query, setQuery] = useState<string>("");

  /////////////////////Working with localStorage as DB//////////////////

  useEffect(() => {
    if (useLocalStorageAsDB) loadDefaultDBInLocalStorage();
  }, []);

  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentPageSearch(1);
  }, [query]);

  return (
    <MovieSysContext.Provider
      value={{
        favoriteIndexURL: favoriteIndexURL,
        imagesURL: imagesURL,
        useLocalStorageAsDB: useLocalStorageAsDB
      }}
    >
      <Container>
        <BrowserRouter>
          <NavBar handleSearchMovies={setQuery} />

          <Switch>
            <Route path="/billboard">
              <StandardPage
                pageTitle={"Billboard"}
                api_URL={billboardURL}
                currentPage={currentPageBillboard}
                showFavoriteCmp={false}
                handleChangeCurrentPage={setCurrentPageBillboard}
              />
            </Route>
            <Route path="/popular">
              <StandardPage
                pageTitle={"Popular"}
                api_URL={popularURL}
                currentPage={currentPagePopular}
                showFavoriteCmp={false}
                handleChangeCurrentPage={setCurrentPagePopular}
              />
            </Route>
            <Route path="/boy">
              <StandardPage
                pageTitle={"Boy"}
                api_URL={boyURL}
                currentPage={currentPageBoy}
                showFavoriteCmp={false}
                handleChangeCurrentPage={setCurrentPageBoy}
              />
            </Route>
            <Route path="/search">
              <StandardPage
                pageTitle={"Search"}
                api_URL={searchURL}
                currentPage={currentPageSearch}
                showFavoriteCmp={false}
                handleChangeCurrentPage={setCurrentPageSearch}
                query={query}
              />
            </Route>
            {useLocalStorageAsDB ? (
              <Route path="/favorite">
                <FavoritePage pageTitle={"Favorite"} showFavoriteCmp={true} />
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
            )}
            <Route path="/search">
              <StandardPage
                pageTitle={"Search"}
                api_URL={searchURL}
                currentPage={currentPageSearch}
                showFavoriteCmp={false}
                handleChangeCurrentPage={setCurrentPageSearch}
                query={query}
              />
            </Route>
            <Redirect to="/billboard" />
          </Switch>
        </BrowserRouter>
      </Container>
    </MovieSysContext.Provider>
  );
};

export default Movies;
