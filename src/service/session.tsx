import { AuthParamsInterface } from "../components/authContext";
import axios from "axios";
import {
  apiURL,
  apiPathNewToken,
  apiPathValidateToken,
  apiPathNewSession,
  apiPathDeleteSession,
  apiKey
} from "./apiData";

const axiosFetch = (
  method: "get" | "post" | "delete",
  URL: string,
  params: object,
  data: object,
  successFunction: (...rest: any[]) => void,
  errorFunction: () => void,
  ...rest: any[]
) => {
  axios({
    method: method,
    url: URL,
    params: params,
    data: data
  })
    .then(response => {
      if (response.status === 200) {
        successFunction(response, ...rest);
      } else {
        errorFunction();
      }
    })
    .catch(error => {
      errorFunction();
    });
};

export const createNewSession = (
  username: string,
  password: string,
  handleSetAuthParams: (params: AuthParamsInterface) => void
) => {
  const createSession = (
    response: any,
    handleSetAuthParams: (params: AuthParamsInterface) => void
  ) => {
    let URL = apiURL + apiPathNewSession;
    let params = { api_key: apiKey };
    let data = {
      request_token: response.data.request_token
    };

    const errorCreateSession = () => {
      console.log("errorCreateSession");
    };
    const successCreateSession = (res: any) => {
      console.log("inside create", res);
      let params: AuthParamsInterface = res.data.success
        ? {
            session_id: res.data.session_id,
            request_token: response.data.request_token
          }
        : { session_id: "", request_token: "" };
      handleSetAuthParams(params);
    };

    axiosFetch(
      "post",
      URL,
      params,
      data,
      successCreateSession,
      errorCreateSession
    );
  };

  const validateRequestToken = (
    response: any,
    username: string,
    password: string,
    ...rest: any[]
  ) => {
    let URL = apiURL + apiPathValidateToken;
    let params = { api_key: apiKey };
    let data = {
      username: username,
      password: password,
      request_token: response.data.request_token
    };

    const errorValidateRequestToken = () => {
      console.log("errorValidateRequestToken");
    };

    axiosFetch(
      "post",
      URL,
      params,
      data,
      createSession,
      errorValidateRequestToken,
      ...rest
    );
  };

  const getRequestToken = (...rest: any[]) => {
    let URL = apiURL + apiPathNewToken;
    let params = { api_key: apiKey };

    const errorGetRequestToken = () => {
      console.log("errorGetRequestToken");
    };

    axiosFetch(
      "get",
      URL,
      params,
      {},
      validateRequestToken,
      errorGetRequestToken,
      ...rest
    );
  };

  getRequestToken(username, password, handleSetAuthParams);
};

export const deleteSession = (
  session_id: string,
  handleSetAuthParams: (params: AuthParamsInterface) => void
) => {
  let URL = apiURL + apiPathDeleteSession;
  let params = { api_key: apiKey };
  let data = {
    session_id: session_id
  };

  const errorDeleteSession = () => {
    console.log("errorDeleteSession");
  };

  const handleSuccessDelete = (response: any) => {
    console.log("inside delete", response);
    handleSetAuthParams({ session_id: "", request_token: "" });
  };

  axiosFetch(
    "delete",
    URL,
    params,
    data,
    handleSuccessDelete,
    errorDeleteSession
  );
};
