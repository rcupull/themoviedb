import React, { Fragment } from "react";
import { Movie } from "../components/movies";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";
import BasicMovieInformation from "./basicInformation";

export interface ListMoviesProps {
  movies: Movie[];
}

const ListMovies: React.SFC<ListMoviesProps> = ({ movies }) => {
  const numCol = 4;
  const numRow = Math.ceil(movies.length / numCol);

  let rowItems = _.range(1, numRow + 1);
  let colItems = _.range(1, numCol + 1);

  let basicMovieInformationShowed = 0;
  return (
    <Fragment>
      {rowItems.map(row => (
        <Row key={row}>
          {colItems.map(col => (
            <Col sm key={col}>
              {basicMovieInformationShowed < movies.length ? (
                <BasicMovieInformation
                  movie={movies[basicMovieInformationShowed++]}
                />
              ) : null}
            </Col>
          ))}
        </Row>
      ))}
    </Fragment>
  );
};

export default ListMovies;
