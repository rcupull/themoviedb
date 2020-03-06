import React, { useState, useEffect, Fragment } from "react";

import { Movie } from "../components/movies";
import ListMovies from "./listMovies";
import axios from "axios";
import { ToMovies } from "../utils/movieUtils";

import { PageContext } from "../components/pageContext";

import Pagination from "./pagination";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailMovieInformation from "../presentational/detailInformation";
import { RequestParamsInterface } from "../service/apiData";
import {
  MarkAsFavorite,
  data_MarkAsFavoriteInterface
} from "../service/apiUtils";
import { useAuthContext } from "../components/authContext";
export interface StandardPageProps {
  requestParams: RequestParamsInterface;
  pageTitle: string;
  showFavoriteCmp: boolean;
  currentPage: number;
  handleChangeCurrentPage: (page: number) => void;
  query?: string;
}

const StandardPage: React.SFC<StandardPageProps> = ({
  requestParams,
  pageTitle,
  showFavoriteCmp,
  currentPage,
  handleChangeCurrentPage,
  query
}) => {
  const { path } = useRouteMatch();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const { params } = useAuthContext();

  let session_id = params.session_id;
  // //////////////////////////////////////////////////////////////////////////////////////////

  // const getMovie = (
  //   api_URL: string,
  //   page: number,
  //   predicate: number[] | boolean,
  //   query?: string
  // ) => {
  //   let params =
  //     typeof query === "undefined"
  //       ? { page: page }
  //       : { page: page, query: query };

  //   axios
  //     .get(api_URL, {
  //       params: params
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         setError(false);
  //         setTotalPages(res.data.total_pages);
  //         setAllMovies(ToMovies(res.data.results, predicate));
  //       } else {
  //         setError(true);
  //       }
  //     })
  //     .catch(error => {
  //       setError(true);
  //     });
  // };

  useEffect(() => {
    let params = {
      ...requestParams.params,
      ...{ page: currentPage }
    };

    if (typeof query !== "undefined")
      params = { ...params, ...{ query: query } };
    if (typeof session_id !== "undefined" && session_id)
      params = { ...params, ...{ session_id: session_id } };

    axios({
      method: requestParams.method,
      url: requestParams.URL,
      params: params,
      data: requestParams.data
    })
      .then(res => {
        if (res.status === 200) {
          // getMovie(api_URL, currentPage, res.data, query);
          setError(false);
          setTotalPages(res.data.total_pages);
          setAllMovies(ToMovies(res.data.results, false));
          console.log(res.data);
        } else {
          setError(true);
        }
      })
      .catch(error => {
        setError(true);
      });
  }, [currentPage, requestParams, query, session_id]);

  ////////////////////////////Favorites functions//////////////////////////////////////////////

  // const handleFavoriteInsertDeleteDB = (
  //   movie: Movie,
  //   action: "delete" | "insert"
  // ) => {
  //   MarkAsFavorite(session_id);

  //   if (useLocalStorageAsDB) {
  //     if (action === "insert") {
  //       insertFavorite(movie);
  //       changeFavoriteMovieInArray(movie, true);
  //     } else {
  //       deleteFavorite(movie);
  //       changeFavoriteMovieInArray(movie, false);
  //     }
  //   } else {
  //     axios
  //       .post("http://localhost:8888/" + action, {
  //         movieMetadata: movie.movieMetadata
  //       })
  //       .then(res => {
  //         if (res.status === 200) {
  //           changeFavoriteMovieInArray(
  //             movie,
  //             action === "insert" ? true : false
  //           );
  //         } else {
  //           setError(true);
  //         }
  //       })
  //       .catch(error => {
  //         setError(true);
  //       });
  //   }
  // };

  const handleMarkAsFavorite = (movie: Movie) => {
    console.log("session_id", session_id);
    if (session_id === "" || !session_id) {
      console.log("sesion_id is required");
      return;
    }

    const succesFunction = (res: any) => {
      console.log("Favorite inserted", res);
      // let tmpArrayMovies: Movie[] = [...allMovies];
      // let id = movie.movieMetadata.id;
      // for (let index = 0; index < tmpArrayMovies.length; index++) {
      //   if (tmpArrayMovies[index].movieMetadata.id === id) {
      //     tmpArrayMovies[index].isfavorite = isfavorite;
      //     break;
      //   }
      // }
      // setAllMovies(tmpArrayMovies);
    };
    const errorFunction = () => {
      console.log("error Favorite inserted");
    };

    let data: data_MarkAsFavoriteInterface = {
      media_type: "movie",
      media_id: movie.movieMetadata.id,
      favorite: !movie.isfavorite
    };

    MarkAsFavorite(data, session_id, succesFunction, errorFunction);
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
        handleMarkAsFavorite: handleMarkAsFavorite
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
