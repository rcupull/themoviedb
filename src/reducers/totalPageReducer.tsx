import { Reducer, Action } from "redux";

/////////////////////////////TYPES//////////////////////////////////////////
export type PagesAmountActionType = "SET_PAGES_AMOUNT";
export interface PagesAmountAction extends Action<PagesAmountActionType> {
  payload: number;
}
export type PagesAmountState = number;

/////////////////////////////////ACTIONS//////////////////////////////////
const SetPagesAmountAction = (pagesAmount: number): PagesAmountAction => ({
  type: "SET_PAGES_AMOUNT",
  payload: pagesAmount
});

export const Actions = { SetPagesAmountAction };

///////////////////////////////REDUCER/////////////////////////////////////
const initialPagesAmountState: PagesAmountState = 1;
export const PagesAmountReducer: Reducer<
  PagesAmountState,
  PagesAmountAction
> = (state = initialPagesAmountState, action) => {
  switch (action.type) {
    case "SET_PAGES_AMOUNT":
      return action.payload;
    default:
      return state;
  }
};
