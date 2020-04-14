import React, { Fragment } from "react";
import { Movie } from "../reducers/dataTypes";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";
import MovieAbstract from "../containers/movieAbstractC";

export interface ListMoviesProps {
  movies: Movie[];
  showFavoriteComponent: boolean;
}

const ListMovies: React.SFC<ListMoviesProps> = ({
  movies,
  showFavoriteComponent
}) => {
  const numCol = 4;
  const numRow = Math.ceil(movies.length / numCol);

  let rowItems = _.range(1, numRow + 1);
  let colItems = _.range(1, numCol + 1);

  let abstactMovieShown = 0;
  return (
    <Fragment>
      {rowItems.map(row => (
        <Row key={row}>
          {colItems.map(col => (
            <Col sm key={col}>
              {abstactMovieShown < movies.length ? (
                <MovieAbstract
                  movie={movies[abstactMovieShown++]}
                  showFavoriteComponent={showFavoriteComponent}
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
