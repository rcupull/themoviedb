import { AuthState, initialAuthState } from "../reducers/authReducer";
import {
  apiURL,
  apiPathNewToken,
  apiPathValidateToken,
  apiPathNewSession,
  apiPathDeleteSession,
  apiKey
} from "./apiData";
import { axiosFetch } from "./apiUtils";
export const nameSessionData = "movieSessionData";

export const CreateNewSession = (
  username: string,
  password: string,
  handleSetAuthParams: (params: AuthState) => void
) => {
  const createSession = (
    response: any,
    handleSetAuthParams: (params: AuthState) => void
  ) => {
    if (response.status === 200) {
      let URL = apiURL + apiPathNewSession;
      let params = { api_key: apiKey };
      let data = {
        request_token: response.data.request_token
      };

      const errorCreateSession = () => {
        console.log("errorCreateSession");
      };
      const successCreateSession = (res: any) => {
        if (res.status === 200) {
          let params: AuthState = res.data.success
            ? {
                session_id: res.data.session_id,
                request_token: response.data.request_token
              }
            : initialAuthState;
          handleSetAuthParams(params);
        }
      };
      axiosFetch(
        "post",
        URL,
        params,
        data,
        { successFunction: successCreateSession, args: [] },
        errorCreateSession
      );
    }
  };

  const validateRequestToken = (
    response: any,
    username: string,
    password: string,
    ...rest: any[]
  ) => {
    if (response.status === 200) {
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
        { successFunction: createSession, args: rest },
        errorValidateRequestToken
      );
    }
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
      { successFunction: validateRequestToken, args: rest },
      errorGetRequestToken
    );
  };

  getRequestToken(username, password, handleSetAuthParams);
};

export const DeleteSession = (
  session_id: string,
  handleSetAuthParams: (params: AuthState) => void
) => {
  let URL = apiURL + apiPathDeleteSession;
  let params = { api_key: apiKey };
  let data = {
    session_id: session_id
  };

  const errorFunction = (res: any) => {
    console.log("errorDeleteSession");
  };

  const successFunction = (res: any) => {
    if (res.status === 200) {
      handleSetAuthParams(initialAuthState);
    }
  };

  axiosFetch(
    "delete",
    URL,
    params,
    data,
    { successFunction: successFunction, args: [] },
    errorFunction
  );
};

export const ValidateSession = () => {};
