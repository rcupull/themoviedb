import React, { useState, Fragment, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { AuthParamsInterface, useAuthContext } from "../components/authContext";
import { createNewSession, deleteSession } from "../service/session";
import { UserModeLabelStyle } from "../components/stylesComponents";

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

  const UserMode = () => {
    return (
      <Fragment>
        {LabelUserType("User mode")}
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
      </Fragment>
    );
  };

  const AdminMode = () => {
    return (
      <Fragment>
        {LabelUserType("Admin mode")}
        <Form.Group controlId="formBasicPassword">
          <Button variant="primary" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Form.Group>
      </Fragment>
    );
  };

  return params.session_id ? AdminMode() : UserMode();
};

export default Login;
