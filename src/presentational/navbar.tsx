import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { useAuthContext } from "../components/authContext";
import { Link, useHistory } from "react-router-dom";
import {
  navBarLinkStyle,
  navBarBrandStyle
} from "../components/stylesComponents";

export interface NavBarProps {
  handleSearch: (query: string) => void;
}

enum TypeTab {
  standarUser,
  adminUser
}
interface Tag {
  id: number;
  path: string;
  text: string;
  type: TypeTab;
}
const NavBarField: Tag[] = [
  { id: 0, path: "/billboard", text: "Billboard", type: TypeTab.standarUser },
  { id: 1, path: "/popular", text: "Popular", type: TypeTab.standarUser },
  { id: 2, path: "/boy", text: "Boy", type: TypeTab.standarUser },
  { id: 3, path: "/favorite", text: "Favorite", type: TypeTab.adminUser }
];
const NavBar: React.SFC<NavBarProps> = ({ handleSearch }) => {
  const [query, setQuery] = useState<string>("");
  const { params } = useAuthContext();
  let history = useHistory();

  const handleChangeQuery = (event: any) => {
    setQuery(event.target.value);
  };

  const showTags = () => {
    return (
      <Nav className="mr-auto">
        {NavBarField.map((tag: Tag) =>
          tag.type === TypeTab.adminUser && !params.session_id ? null : (
            <Link
              key={tag.id}
              style={navBarLinkStyle}
              to={tag.path}
              onClick={() => setQuery("")}
            >
              {tag.text}
            </Link>
          )
        )}
      </Nav>
    );
  };

  const handleSearchIntro = (query: string) => {
    handleSearch(query);
    history.push("/search");
  };

  const handleOnKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearchIntro(query);
    }
  };
  const showSearch = () => {
    return (
      <Form inline>
        <Row>
          <Col xs={8}>
            <FormControl
              onKeyDown={handleOnKeyDown}
              onChange={handleChangeQuery}
              type="text"
              value={query}
              placeholder="Search"
              className="mr-sm-2"
            />
          </Col>
          <Col xs={2}>
            <Button
              variant="outline-success"
              onClick={() => {
                handleSearchIntro(query);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={navBarBrandStyle}>Movie Type</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {showTags()}
        {showSearch()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
