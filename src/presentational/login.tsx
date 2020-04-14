import React, { useState, Fragment, useEffect } from "react";

import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState, Actions } from "../reducers/rootReducer";
import { CreateNewSession, DeleteSession } from "../service/session";
import {
  UserModeLabelStyle,
  LoginContainerStyle
} from "../components/stylesComponents";
import { AuthState } from "../reducers/authReducer";

interface LoginProps {}
const Login: React.SFC<LoginProps> = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassWord] = useState<string>("");
  const dispatch = useDispatch();
  const session_id = useSelector(
    (state: RootReducerState) => state.auth.session_id
  );
  ////////////////////////////////////////
  const handleLogin = (event: any) => {
    event.preventDefault();
    CreateNewSession(username, password, (params: AuthState) => {
      dispatch(Actions.LoginAction(params));
    });
  };
  const handleLogout = () => {
    DeleteSession(session_id, () => {
      dispatch(Actions.LogoutAction());
    });
  };
  //////////////////////////////////////////////
  const LabelUserType = (text: string) => {
    return <Form.Label style={UserModeLabelStyle}>{text}</Form.Label>;
  };

  const StandardUser = () => {
    return (
      <Container style={LoginContainerStyle}>
        {LabelUserType("Standard user")}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e: any) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e: any) => setPassWord(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  };

  const AdvancedUser = () => {
    return (
      <Container style={LoginContainerStyle}>
        {LabelUserType("Advanced user")}
        <Form.Group controlId="formBasicPassword">
          <Button variant="primary" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Form.Group>
      </Container>
    );
  };

  return session_id ? AdvancedUser() : StandardUser();
};

export default Login;
