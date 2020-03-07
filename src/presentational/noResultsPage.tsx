import React from "react";
import { Container, FormLabel } from "react-bootstrap";
import {
  noResultsContainerStyle,
  noResultsFormLabelStyle
} from "../components/stylesComponents";

export interface NoResultsPageProps {}
const NoResultsPage: React.SFC<NoResultsPageProps> = () => {
  return (
    <Container style={noResultsContainerStyle}>
      <FormLabel style={noResultsFormLabelStyle}>
        ..Ups!!, no movies for see
      </FormLabel>
    </Container>
  );
};

export default NoResultsPage;
// style={{ verticalAlign: "middle" }}
