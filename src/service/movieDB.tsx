import _ from "lodash";
import DB from "./db";
import { Movie, MovieMetadata } from "../components/movies";
export const nameDB = "MyDB"; //Always start with 'M' letter
///////////////////////////////////////////////////////////////////////////////////////////
const readDB = () => {
  let data = localStorage.getItem(nameDB);
  if (data) return JSON.parse(data);
  return 0;
};
const writeDB = (data: any) => {
  localStorage.setItem(nameDB, JSON.stringify(data));
};
const existDB = () => {
  return localStorage.getItem(nameDB) ? true : false;
};
///////////////////////////////////////////////////////////////////////////////////////////
export const loadDefaultDBInLocalStorage = () => {
  if (!existDB()) writeDB(DB);
};
export const clearLocalStorage = () => {
  localStorage.removeItem(nameDB);
};

export const getFavoritesMovies = () => {
  return readDB();
};

export const getFavoriteAllIndex = () => {
  let data = readDB();

  let arrayIndex = _.map(data.results, movieMetadata => {
    return movieMetadata.id;
  });
  return arrayIndex;
};

export const deleteFavorite = (movie: Movie) => {
  let data = readDB();

  let currentId = movie.movieMetadata.id;
  let movieMetadataArray = _.filter(data.results, movieMetadata => {
    return movieMetadata.id !== currentId;
  });
  data.results = movieMetadataArray;
  writeDB(data);
};

export const insertFavorite = (movie: Movie) => {
  let data = readDB();

  let currentId: number = movie.movieMetadata.id;
  let index = _.findIndex(data.results, (movieMetadata: MovieMetadata) => {
    return movieMetadata.id === currentId;
  });
  if (index < 0) {
    data.results.push(movie.movieMetadata);
    writeDB(data);
  }
};
