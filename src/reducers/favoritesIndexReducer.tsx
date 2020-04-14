import { Reducer, Action } from "redux";
import _ from "lodash";
//////////////////////////////////////////////TYPES/////////////////////////////////
export type FavoritesIndexActionType =
  | "SET_INDEX_ARRAY"
  | "APPEND_INDEX"
  | "DELETE_INDEX"
  | "DELETE_INDEX_ARRAY";
export interface FavoritesIndexAction extends Action<FavoritesIndexActionType> {
  payload: any;
}
export type FavoritesIndexState = number[];
///////////////////////////////////////////////////ACTIONS////////////////////////////
const SetFavoritesIndex = (indexArray: number[]): FavoritesIndexAction => ({
  type: "SET_INDEX_ARRAY",
  payload: indexArray
});
const DeleteFavoritesIndex = (): FavoritesIndexAction => ({
  type: "DELETE_INDEX_ARRAY",
  payload: []
});
const DeleteOneFevoriteIndex = (id: number): FavoritesIndexAction => ({
  type: "DELETE_INDEX",
  payload: id
});
const AppendFavoriteIndex = (id: number): FavoritesIndexAction => ({
  type: "APPEND_INDEX",
  payload: id
});

export const Actions = {
  SetFavoritesIndex,
  DeleteFavoritesIndex,
  DeleteOneFevoriteIndex,
  AppendFavoriteIndex
};
const initialFavoriteIndexState: FavoritesIndexState = [];
/////////////////////////////////////////////////////REDUCER//////////////////////////////
export const FavoritesIndexReducer: Reducer<
  FavoritesIndexState,
  FavoritesIndexAction
> = (state = initialFavoriteIndexState, action) => {
  switch (action.type) {
    case "SET_INDEX_ARRAY":
      return action.payload;
    case "DELETE_INDEX_ARRAY":
      return initialFavoriteIndexState;
    case "APPEND_INDEX":
      return [...state].push(action.payload);
    case "DELETE_INDEX":
      let index: number = _.findIndex(state, id => id === action.payload);
      return index >= 0 ? _.filter(state, id => id !== index) : state;
    default:
      return state;
  }
};
