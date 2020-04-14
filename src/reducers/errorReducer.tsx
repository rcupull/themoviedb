import { Reducer, Action } from "redux";

/////////////////////////////TYPES//////////////////////////////////////////
export type ErrorActionType = "SET_ERROR" | "CLEAR_ERROR";
export interface ErrorAction extends Action<ErrorActionType> {
  payload: null;
}
export type ErrorState = boolean;

/////////////////////////////////ACTIONS//////////////////////////////////
const SetErrorAction = (): ErrorAction => ({
  type: "SET_ERROR",
  payload: null
});

const ClearErrorAction = (): ErrorAction => ({
  type: "CLEAR_ERROR",
  payload: null
});

export const Actions = { SetErrorAction, ClearErrorAction };

///////////////////////////////REDUCER/////////////////////////////////////
const initialErrorState: ErrorState = false;
export const ErrorReducer: Reducer<ErrorState, ErrorAction> = (
  state = initialErrorState,
  action
) => {
  switch (action.type) {
    case "SET_ERROR":
      return true;
    case "CLEAR_ERROR":
      return false;
    default:
      return state;
  }
};
