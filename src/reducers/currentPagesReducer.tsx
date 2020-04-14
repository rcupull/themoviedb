import { Reducer, Action } from "redux";

/////////////////////////////////////////////types////////////////////////////////////////////
export type CurrentPageActionType = "SET_CURRENT_PAGE";
export type PageType = "BILLBOARD" | "BOY" | "POPULAR" | "SEARCH" | "FAVORITE";

export interface CurrentPageState {
  billboard: number;
  popular: number;
  boy: number;
  favorite: number;
  search: number;
}
const initialCurrentPageState: CurrentPageState = {
  billboard: 1,
  boy: 1,
  favorite: 1,
  popular: 1,
  search: 1
};
export interface CurrentPageAction extends Action<CurrentPageActionType> {
  payload: { pageType: PageType; pageNumber: number };
}

///////////////////////////////////////////////Actions////////////////////////////////////

const SetCurrentPageAction = (
  pageType: PageType,
  pageNumber: number
): CurrentPageAction => ({
  type: "SET_CURRENT_PAGE",
  payload: { pageType: pageType, pageNumber: pageNumber }
});

export const Actions = { SetCurrentPageAction };

/////////////////////////////////////////////////////Reducer//////////////////////////////
const SetCurrentPage = (
  state: CurrentPageState,
  action: CurrentPageAction
): CurrentPageState => {
  switch (action.payload.pageType) {
    case "BILLBOARD":
      return { ...state, billboard: action.payload.pageNumber };
    case "BOY":
      return { ...state, boy: action.payload.pageNumber };
    case "FAVORITE":
      return { ...state, favorite: action.payload.pageNumber };
    case "POPULAR":
      return { ...state, popular: action.payload.pageNumber };
    case "SEARCH":
      return { ...state, search: action.payload.pageNumber };
    default:
      return state;
  }
};

export const CurrentPageReducer: Reducer<
  CurrentPageState,
  CurrentPageAction
> = (state = initialCurrentPageState, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return SetCurrentPage(state, action);
    default:
      return state;
  }
};
