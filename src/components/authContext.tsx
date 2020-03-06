import { createContext, useContext } from "react";

export interface AuthParamsInterface {
  session_id: string;
  request_token: string;
}

export interface AuthContextInterface {
  params: AuthParamsInterface;
  setParams: (params: AuthParamsInterface) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  params: {
    session_id: "",
    request_token: ""
  },
  setParams: (params: AuthParamsInterface) => {}
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};
