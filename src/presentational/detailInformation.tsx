import React from "react";
import { Movie } from "../components/movies";
import { useLocation } from "react-router-dom";
import { usePageContext } from "../components/pageContext";
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
interface DetailMovieInformationProps {}

const DetailMovieInformation: React.SFC<DetailMovieInformationProps> = () => {
  let { state } = useLocation();
  const { handleMarkAsFavorite } = usePageContext();

  if (typeof state === "undefined") {
    return <h1>undefined movie</h1>;
  }
  const movie: Movie = state.movie;

  const topics = (title: string, text: any) => {
    return (
      <Row>
        <Col xs={3} style={detailCardColStyle1}>
          <Card.Title>{title}</Card.Title>
        </Col>
        <Col>
          <Card.Text>{text ? text : "None"}</Card.Text>
        </Col>
      </Row>
    );
  };

  return (
    <Card style={detailCardStyle}>
      <Row>
        <Col xs={3}>
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
        <Col>
          <Row>
            <Col xs={8}>
              <Card.Title style={detailCardTitleStyle}>
                {movie.movieMetadata.title}
              </Card.Title>
            </Col>
            <Col style={detailCardColStyle1}>
              <Favorite
                active={movie.isfavorite}
                setActive={() => {
                  if (handleMarkAsFavorite) handleMarkAsFavorite(movie);
                }}
              />
            </Col>
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
