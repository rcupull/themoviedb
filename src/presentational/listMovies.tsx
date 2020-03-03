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

  const listingMovies = () => {
    let basicMovieInformationShowed = 0;
    return rowItems.map(row => (
      <Row key={row}>
        {colItems.map(col => (
          <Col key={col}>
            {basicMovieInformationShowed < movies.length ? (
              <BasicMovieInformation
                movie={movies[basicMovieInformationShowed++]}
              />
            ) : (
              ""
            )}
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <Fragment>
      {movies.length === 0 ? <h4>No movies</h4> : listingMovies()}
    </Fragment>
  );
};

export default ListMovies;
