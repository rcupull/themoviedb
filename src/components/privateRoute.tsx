import React from "react";
import { RootReducerState } from "../reducers/rootReducer";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export interface SessionDependentRouteProps {
  path: string;
  children: any;
}

const PrivateRoute: React.SFC<SessionDependentRouteProps> = ({
  path,
  children
}) => {
  const session_id: string = useSelector(
    (state: RootReducerState) => state.auth.session_id
  );
  return session_id === "" ? (
    <Redirect to="/billboard" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export default PrivateRoute;
