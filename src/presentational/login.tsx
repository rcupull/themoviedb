import React, { useState, Fragment, useEffect } from "react";

import { Form, Button, Container } from "react-bootstrap";
import { useAuthContext } from "../components/authContext";
import { createNewSession, deleteSession } from "../service/session";
import {
  UserModeLabelStyle,
  LoginContainerStyle
} from "../components/stylesComponents";

interface LoginProps {}
const Login: React.SFC<LoginProps> = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassWord] = useState<string>("");

  const { setParams, params } = useAuthContext();

  const handleLogin = (event: any) => {
    event.preventDefault();
    createNewSession(username, password, setParams);
  };
  const handleLogout = () => {
    deleteSession(params.session_id, setParams);
  };

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

  return params.session_id ? AdvancedUser() : StandardUser();
};

export default Login;
