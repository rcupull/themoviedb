import React from "react";
import { Component } from "react";
import { useAuthContext } from "./authContext";
import { Route, Redirect } from "react-router-dom";

export interface SessionDependentRouteProps {
  path: string;
  children: any;
}

const SessionDependentRoute: React.SFC<SessionDependentRouteProps> = ({
  path,
  children
}) => {
  const { params } = useAuthContext();

  return params.session_id ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/billboard" />
  );
};

export default SessionDependentRoute;
