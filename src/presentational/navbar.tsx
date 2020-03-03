import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  navBarLinkStyle,
  navBarBrandStyle,
  navBarSearchButtonStyle
} from "../components/stylesComponents";

export interface NavBarProps {
  handleSearchMovies: (query: string) => void;
}

const NavBar: React.SFC<NavBarProps> = ({ handleSearchMovies }) => {
  const [query, setQuery] = useState<string>("");

  const handleChangeQuery = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={navBarBrandStyle}>Movie Type</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            style={navBarLinkStyle}
            to="/billboard"
            onClick={() => {
              setQuery("");
            }}
          >
            Billboard
          </Link>

          <Link
            style={navBarLinkStyle}
            to="/popular"
            onClick={() => {
              setQuery("");
            }}
          >
            Popular
          </Link>
          <Link
            style={navBarLinkStyle}
            to="/boy"
            onClick={() => {
              setQuery("");
            }}
          >
            Boy
          </Link>
          <Link
            style={navBarLinkStyle}
            to="/favorite"
            onClick={() => {
              setQuery("");
            }}
          >
            Favorite
          </Link>
        </Nav>
        <Form inline>
          <FormControl
            onChange={handleChangeQuery}
            type="text"
            value={query}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Link
            style={navBarSearchButtonStyle}
            to="/search"
            onClick={() => {
              handleSearchMovies(query);
            }}
          >
            Search
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
