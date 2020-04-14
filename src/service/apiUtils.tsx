import axios from "axios";
import {
  markAsFavoriteURL,
  apiKey,
  MovieParams,
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

export const GetPage = (
  requestParams: RequestParamsInterface,
  page: number,
  successFunction: (res: any) => void,
  errorFunction: (res: any) => void,
  optionalParams?: { session_id?: string; query?: string }
) => {
  let params =
    typeof optionalParams === "undefined"
      ? {
          ...requestParams.params,
          ...{ page: page }
        }
      : {
          ...requestParams.params,
          ...{ page: page, ...optionalParams }
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
    ...MovieParams.favorites.params,
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
    MovieParams.favorites.method,
    MovieParams.favorites.URL,
    params,
    MovieParams.favorites.data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};
