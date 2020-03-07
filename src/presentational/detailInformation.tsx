import React from "react";
import { Movie } from "../components/movies";
import { useAuthContext } from "../components/authContext";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import Noimage from "../img/NoImage.jpg";
import {
  detailCardStyle,
  detailCardImgStyle,
  detailCardColStyle1,
  detailCardTitleStyle,
  detailCardBodyTitleStyle
} from "../components/stylesComponents";
import Favorite from "./favorite";
import { imagesURL } from "../service/apiData";
interface DetailMovieInformationProps {
  movie: Movie;
}

const DetailMovieInformation: React.SFC<DetailMovieInformationProps> = ({
  movie
}) => {
  const session_id = useAuthContext().params.session_id;
  const topics = (title: string, text: any) => {
    return (
      <Row>
        <Col sm={3} style={detailCardColStyle1}>
          <Card.Title>{title}</Card.Title>
        </Col>
        <Col>
          <Card.Text>{text ? text : "None"}</Card.Text>
        </Col>
      </Row>
    );
  };

  const showFavoriteOrNot = () => {
    return session_id ? (
      <Col style={detailCardColStyle1}>
        <Favorite movie={movie} />
      </Col>
    ) : null;
  };
  return (
    <Card style={detailCardStyle}>
      <Row>
        <Col sm={3}>
          <Card.Img
            style={detailCardImgStyle}
            variant="top"
            src={
              movie.movieMetadata.poster_path
                ? imagesURL + movie.movieMetadata.poster_path
                : Noimage
            }
          />
        </Col>
        <Col sm={8}>
          <Row>
            <Col sm={8}>
              <Card.Title style={detailCardTitleStyle}>
                {movie.movieMetadata.title}
              </Card.Title>
            </Col>
            <Col sm={3}>{showFavoriteOrNot()}</Col>
          </Row>
          <Card.Body style={detailCardBodyTitleStyle}></Card.Body>

          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {topics("Original title", movie.movieMetadata.original_title)}
            </ListGroupItem>
            <ListGroupItem>
              {topics("Vote count", movie.movieMetadata.vote_count)}
            </ListGroupItem>
            <ListGroupItem>
              {topics("Popularity", movie.movieMetadata.popularity)}
            </ListGroupItem>

            <ListGroupItem>
              {topics("Sinopsis", movie.movieMetadata.overview)}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  );
};
export default DetailMovieInformation;
