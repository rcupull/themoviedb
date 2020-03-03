import { Movie } from "../components/movies";
import _ from "lodash";

function existId(id: number, arrayId: number[]): boolean {
  return arrayId.length
    ? _.findIndex(arrayId, cid => {
        return cid === id;
      }) >= 0
      ? true
      : false
    : false;
}

export function ToMovies(
  movieMeta: any[],
  predicate: number[] | boolean
): Movie[] {
  //Delete null elements

  let tmp: any[] = _.filter(movieMeta, mov => {
    if (mov) {
      return mov;
    }
  });

  //Create movie objects

  if (typeof predicate === "object") {
    return _.map(tmp, meta => {
      return {
        movieMetadata: meta,
        isfavorite: existId(meta.id, predicate)
      };
    });
  } else {
    return _.map(tmp, meta => {
      return {
        movieMetadata: meta,
        isfavorite: predicate
      };
    });
  }
}
