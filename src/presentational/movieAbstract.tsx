import * as React from "react";
import { Movie } from "../reducers/dataTypes";
import { Card } from "react-bootstrap";
import Favorite from "../containers/favoritesC";
import Noimage from "../img/NoImage.jpg";
import {
  basicCardStyle,
  basicCardImgStyle,
  basicCardBodyStyle,
  basicCardTitleStyle,
  basicCardBodyImgStyle
} from "../components/stylesComponents";
import { imagesURL } from "../service/apiData";
import { Link, useRouteMatch } from "react-router-dom";

export interface MovieAbstractStateProps {}

export interface MovieAbstractDispatchProps {}

export interface MovieAbstractOwnProps {
  movie: Movie;
  showFavoriteComponent: boolean;
}

type MovieAbstractProps = MovieAbstractStateProps &
  MovieAbstractDispatchProps &
  MovieAbstractOwnProps;
const MovieAbstract: React.SFC<MovieAbstractProps> = ({
  movie,
  showFavoriteComponent
}) => {
  const path = useRouteMatch().path;
  const optionalshowFavoriteCmp = () => {
    return showFavoriteComponent ? <Favorite movie={movie} /> : null;
  };
  return (
    <React.Fragment>
      <Card style={basicCardStyle}>
        <LinkWraperFavoriteBasicInformation movie={movie} path={path}>
          <Card.Body style={basicCardBodyImgStyle}>
            <Card.Img
              style={basicCardImgStyle}
              variant="top"
              src={movie.poster_path ? imagesURL + movie.poster_path : Noimage}
            />
          </Card.Body>
        </LinkWraperFavoriteBasicInformation>

        {optionalshowFavoriteCmp()}

        <LinkWraperFavoriteBasicInformation movie={movie} path={path}>
          <Card.Body style={basicCardBodyStyle}>
            <Card.Text style={basicCardTitleStyle}>{movie.title}</Card.Text>
          </Card.Body>
        </LinkWraperFavoriteBasicInformation>
      </Card>
    </React.Fragment>
  );
};

export default MovieAbstract;

interface LinkWrap {
  movie: Movie;
  path: string;
}

const LinkWraperFavoriteBasicInformation: React.SFC<LinkWrap> = ({
  movie,
  path,
  children
}) => {
  return (
    <Link style={{ all: "unset" }} to={path + "/" + movie.id}>
      {children}
    </Link>
  );
};
