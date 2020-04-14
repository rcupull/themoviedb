import { Movie } from "./dataTypes";
import _ from "lodash";

export const IsFavoriteMovie = (
  movie: Movie,
  favoriteIndex: number[]
): boolean => {
  if (favoriteIndex.length === 0) return false;
  return _.findIndex(favoriteIndex, id => id === movie.id) >= 0 ? true : false;
};

// function existId(id: number, arrayId: number[]): boolean {
//   return arrayId.length
//     ? _.findIndex(arrayId, cid => {
//         return cid === id;
//       }) >= 0
//       ? true
//       : false
//     : false;
// }

// export const ToMovies = (
//   movieMeta: any[],
//   predicate: number[] | boolean
// ): Movie[] => {
//   //Delete null elements

//   let tmp: any[] = _.filter(movieMeta, mov => {
//     if (mov) {
//       return mov;
//     }
//   });

//   //Create movie objects

//   if (typeof predicate === "object") {
//     return _.map(
//       tmp,
//       (meta, id): Movie => {
//         return {
//           movieMetadata: meta
//           // isfavorite: existId(meta.id, predicate)
//           // ID: id
//         };
//       }
//     );
//   } else {
//     return _.map(
//       tmp,
//       (meta, id): Movie => {
//         return {
//           movieMetadata: meta
//           // isfavorite: predicate
//           // ID: id
//         };
//       }
//     );
//   }
// };
