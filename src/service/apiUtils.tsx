import axios from "axios";
import {
  markAsFavoriteURL,
  apiKey,
  GetFavoriteMovieParams,
  RequestParamsInterface
} from "./apiData";
import _ from "lodash";
//////////////////////////////////Axios Fetch////////////////////////////////////////
interface SuccessParams {
  successFunction: (...res: any[]) => void;
  args: any[];
}

export const axiosFetch = (
  method: "get" | "post" | "delete",
  URL: string,
  params: object,
  data: object,
  success: SuccessParams,
  errorFunction: (res: any) => void
) => {
  axios({
    method: method,
    url: URL,
    params: params,
    data: data
  })
    .then(res => {
      success.successFunction(res, ...success.args);
    })
    .catch(error => {
      errorFunction(error);
    });
};
///////////////////////////////////////////////////////////////////////////////////

export interface data_MarkAsFavoriteInterface {
  media_type: "movie" | "TV";
  media_id: number;
  favorite: boolean;
}
export interface MarkAsFavoriteInterface {
  (
    data: data_MarkAsFavoriteInterface,
    session_id: string,
    successFunction: (res: any) => void,
    errorFunction: (res: any) => void
  ): void;
}
export const GetStandarPage = (
  requestParams: RequestParamsInterface,
  page: number,
  successFunction: (res: any) => void,
  errorFunction: (res: any) => void,
  session_id?: string
) => {
  let params =
    typeof session_id === "undefined"
      ? {
          ...requestParams.params,
          ...{ page: page }
        }
      : {
          ...requestParams.params,
          ...{ page: page, session_id: session_id }
        };

  axiosFetch(
    requestParams.method,
    requestParams.URL,
    params,
    requestParams.data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};

export const GetSearchPage = (
  requestParams: RequestParamsInterface,
  page: number,
  query: string,
  successFunction: (res: any) => void,
  errorFunction: (res: any) => void
) => {
  let params = {
    ...requestParams.params,
    ...{ page: page, query: query }
  };

  axiosFetch(
    requestParams.method,
    requestParams.URL,
    params,
    requestParams.data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};

export const MarkAsFavorite: MarkAsFavoriteInterface = (
  data,
  session_id,
  successFunction,
  errorFunction
) => {
  axiosFetch(
    "post",
    markAsFavoriteURL,
    { api_key: apiKey, session_id: session_id },
    data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};

export const GetAllFavoriteIndex = (
  session_id: string,
  setFavoriteIndexArray: (indexArray: number[]) => void
) => {
  let params = {
    ...GetFavoriteMovieParams.params,
    ...{ session_id: session_id, page: 1 }
  };

  const successFunction = (res: any) => {
    if (res.status === 200)
      setFavoriteIndexArray(_.map(res.data.results, meta => meta.id));
  };
  const errorFunction = (res: any) => {
    console.log("error request FavoritesIndex");
  };

  axiosFetch(
    GetFavoriteMovieParams.method,
    GetFavoriteMovieParams.URL,
    params,
    GetFavoriteMovieParams.data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};
