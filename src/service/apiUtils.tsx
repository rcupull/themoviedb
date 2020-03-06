import axios from "axios";
import { markAsFavoriteURL, apiKey } from "./apiData";

export interface data_MarkAsFavoriteInterface {
  media_type: "movie" | "TV";
  media_id: number;
  favorite: boolean;
}
// export interface MarkAsFavoriteInterfaceProps {
//   data: data_MarkAsFavoriteInterface;
//   session_id: string;
//   succesFunction: (res: any) => void;
//   errorFunction: () => void;
// }
export interface MarkAsFavoriteInterface {
  (
    data: data_MarkAsFavoriteInterface,
    session_id: string,
    succesFunction: (res: any) => void,
    errorFunction: () => void
  ): void;
}
export const MarkAsFavorite: MarkAsFavoriteInterface = (
  data,
  session_id,
  succesFunction,
  errorFunction
) => {
  axios({
    method: "post",
    url: markAsFavoriteURL,
    params: {
      api_key: apiKey,
      session_id: session_id
    },
    data: data
  })
    .then(response => {
      if (response.status === 201) {
        //201 code is correct, view api documentation
        succesFunction(response);
      } else {
        errorFunction();
      }
    })
    .catch(error => {
      errorFunction();
    });
};
