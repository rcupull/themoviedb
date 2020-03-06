import * as React from "react";
import { Movie } from "../components/movies";
import { Card } from "react-bootstrap";
import Favorite from "./favorite";
import Noimage from "../img/NoImage.jpg";
import {
  basicCardStyle,
  basicCardImgStyle,
  basicCardBodyStyle,
  basicCardTitleStyle,
  basicCardBodyImgStyle
} from "../components/stylesComponents";
import { imagesURL } from "../service/apiData";
import { usePageContext } from "../components/pageContext";
import { Link, useRouteMatch } from "react-router-dom";

interface BasicMovieInformationProps {
  movie: Movie;
}

const BasicMovieInformation: React.SFC<BasicMovieInformationProps> = ({
  movie
}) => {
  const { path } = useRouteMatch();
  const { showFavoriteCmp, handleMarkAsFavorite } = usePageContext();

  const optionalshowFavoriteCmp = () => {
    return showFavoriteCmp ? (
      <Favorite
        active={movie.isfavorite}
        setActive={() => {
          if (handleMarkAsFavorite) handleMarkAsFavorite(movie);
        }}
      />
    ) : null;
  };
  return (
    <React.Fragment>
      <Card style={basicCardStyle}>
        <LinkWraperFavoriteBasicInformation movie={movie} path={path}>
          <Card.Body style={basicCardBodyImgStyle}>
            <Card.Img
              style={basicCardImgStyle}
              variant="top"
              src={
                movie.movieMetadata.poster_path
                  ? imagesURL + movie.movieMetadata.poster_path
                  : Noimage
              }
            />
          </Card.Body>
        </LinkWraperFavoriteBasicInformation>

        {optionalshowFavoriteCmp()}

        <LinkWraperFavoriteBasicInformation movie={movie} path={path}>
          <Card.Body style={basicCardBodyStyle}>
            <Card.Text style={basicCardTitleStyle}>
              {movie.movieMetadata.title}
            </Card.Text>
          </Card.Body>
        </LinkWraperFavoriteBasicInformation>
      </Card>
    </React.Fragment>
  );
};

export default BasicMovieInformation;

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
    <Link
      style={{ all: "unset" }}
      to={{
        pathname: path + "/" + movie.movieMetadata.id,
        state: { movie: movie }
      }}
    >
      {children}
    </Link>
  );
};
