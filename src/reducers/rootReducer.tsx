import { combineReducers } from "redux";
import { AuthReducer, AuthState, Actions as AuthActions } from "./authReducer";
import {
  QueryReducer,
  QueryState,
  Actions as QueryActions
} from "./queryReducer";
import {
  CurrentPageReducer,
  CurrentPageState,
  Actions as CurrentPageActions
} from "./currentPagesReducer";
import {
  ErrorReducer,
  ErrorState,
  Actions as ErrorActions
} from "./errorReducer";
import {
  PagesAmountReducer,
  PagesAmountState,
  Actions as PagesAmountActions
} from "./totalPageReducer";
import {
  MovieArrayReducer,
  MovieArrayState,
  Actions as MovieArrayActions
} from "./movieArrayReducer";
//////////////////////////////////////////////////////////

export const Actions = {
  ...ErrorActions,
  ...AuthActions,
  ...QueryActions,
  ...CurrentPageActions,
  ...MovieArrayActions,
  ...PagesAmountActions
};

///////////////////////////////////////////////////////
export interface RootReducerState {
  currentPage: CurrentPageState;
  auth: AuthState;
  movies: MovieArrayState;
  query: QueryState;
  error: ErrorState;
  pagesAmount: PagesAmountState;
}

export const RootReducer = combineReducers<RootReducerState>({
  currentPage: CurrentPageReducer,
  auth: AuthReducer,
  movies: MovieArrayReducer,
  query: QueryReducer,
  error: ErrorReducer,
  pagesAmount: PagesAmountReducer
});
