import React from "react";
import { Movie } from "../reducers/dataTypes";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import Noimage from "../img/NoImage.jpg";
import * as styles from "../components/stylesComponents";
import Favorite from "../containers/favoritesC";
import { imagesURL } from "../service/apiData";

export interface MovieDetailsOwnProps {
  movie: Movie;
}
export interface MovieDetailsStateProps {
  session_id: string;
}
export interface MovieDetailsDispatchProps {}

type MovieProps = MovieDetailsStateProps &
  MovieDetailsOwnProps &
  MovieDetailsDispatchProps;

const MovieDetails: React.SFC<MovieProps> = ({ movie, session_id }) => {
  // const session_id = useAuthContext().params.session_id;
  const topics = (title: string, text: any) => {
    return (
      <Row>
        <Col sm={3} style={styles.detailCardColStyle1}>
          <Card.Title>{title}</Card.Title>
        </Col>
        <Col>
          <Card.Text>{text ? text : "None"}</Card.Text>
        </Col>
      </Row>
    );
  };

  const showFavoriteOrNot = () => {
    return session_id === "" ? null : (
      <Col style={styles.detailCardColStyle1}>
        <Favorite movie={movie} />
      </Col>
    );
  };
  return (
    <Card style={styles.detailCardStyle}>
      <Row>
        <Col sm={3}>
          <Card.Img
            style={styles.detailCardImgStyle}
            variant="top"
            src={movie.poster_path ? imagesURL + movie.poster_path : Noimage}
          />
        </Col>
        <Col sm={8}>
          <Row>
            <Col sm={8}>
              <Card.Title style={styles.detailCardTitleStyle}>
                {movie.title}
              </Card.Title>
            </Col>
            <Col sm={3}>{showFavoriteOrNot()}</Col>
          </Row>
          <Card.Body style={styles.detailCardBodyTitleStyle}></Card.Body>

          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {topics("Original title", movie.original_title)}
            </ListGroupItem>
            <ListGroupItem>
              {topics("Vote count", movie.vote_count)}
            </ListGroupItem>
            <ListGroupItem>
              {topics("Popularity", movie.popularity)}
            </ListGroupItem>

            <ListGroupItem>{topics("Sinopsis", movie.overview)}</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  );
};
export default MovieDetails;
