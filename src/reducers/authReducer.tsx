import { Reducer, Action } from "redux";
import { nameSessionData } from "../service/session";

///////////////////////////////////////////////TYPES///////////////////////////////
export type AuthActionType = "LOGIN" | "LOGOUT" | "CHECK_SESSION_CREATED";
export interface AuthState {
  session_id: string;
  request_token: string;
}
export interface AuthAction extends Action<AuthActionType> {
  payload?: AuthState;
}
export const initialAuthState: AuthState = {
  session_id: "",
  request_token: ""
};
//////////////////////////////////////////ACTIONS////////////////////////////////////
const LoginAction: (params: AuthState) => AuthAction = params => {
  return {
    type: "LOGIN",
    payload: params
  };
};
const LogoutAction: () => AuthAction = () => {
  return {
    type: "LOGOUT",
    payload: initialAuthState
  };
};
const CheckSessionCreatedAction: () => AuthAction = () => {
  return {
    type: "CHECK_SESSION_CREATED"
  };
};
export const Actions = { LoginAction, LogoutAction, CheckSessionCreatedAction };
////////////////////////////////////////////REDUCER//////////////////////////////////
export const AuthReducer: Reducer<AuthState, AuthAction> = (
  state = initialAuthState,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(nameSessionData, JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      localStorage.removeItem(nameSessionData);
      return action.payload;
    case "CHECK_SESSION_CREATED":
      let data = localStorage.getItem(nameSessionData);
      return data ? JSON.parse(data) : initialAuthState;
    default:
      return state;
  }
};
