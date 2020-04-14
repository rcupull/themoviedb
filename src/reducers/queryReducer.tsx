import { Reducer, Action } from "redux";

/////////////////////////////TYPES//////////////////////////////////////////
export type QueryActionType = "SET_QUERY";
export interface QueryAction extends Action<QueryActionType> {
  payload: string;
}
export type QueryState = string;

/////////////////////////////////ACTIONS//////////////////////////////////
const SetQueryAction: (query: string) => QueryAction = query => ({
  type: "SET_QUERY",
  payload: query
});

export const Actions = { SetQueryAction };
export const initialQueryState: QueryState = "";
///////////////////////////////REDUCER/////////////////////////////////////
export const QueryReducer: Reducer<QueryState, QueryAction> = (
  state = initialQueryState,
  action
) => {
  switch (action.type) {
    case "SET_QUERY":
      return action.payload;
    default:
      return state;
  }
};
