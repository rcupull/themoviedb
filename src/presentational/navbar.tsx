import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Tab } from "react-bootstrap";
import { useAuthContext } from "../components/authContext";
import { Link } from "react-router-dom";
import {
  navBarLinkStyle,
  navBarBrandStyle,
  navBarSearchButtonStyle
} from "../components/stylesComponents";

export interface NavBarProps {
  handleSearchMovies: (query: string) => void;
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
const NavBar: React.SFC<NavBarProps> = ({ handleSearchMovies }) => {
  const [query, setQuery] = useState<string>("");
  const { params } = useAuthContext();
  const handleChangeQuery = (event: any) => {
    setQuery(event.target.value);
  };

  const showTags = () => {
    return NavBarField.map((tag: Tag) =>
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
    );
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={navBarBrandStyle}>Movie Type</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{showTags()}</Nav>
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
