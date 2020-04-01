import { VsFilter } from "./todoStateControl";
export type ActionType = "ADD_TODO" | "CHANGE_VSFILTER" | "CHECK_TODO";

export interface Action {
  type: ActionType;
  arg: string | number | VsFilter;
}

export const ActionAddTodo: (text: string) => Action = text => {
  return {
    type: "ADD_TODO",
    arg: text
  };
};

export const ActionChangeVsFilter: (
  vsFilter: VsFilter
) => Action = vsFilter => {
  return {
    type: "CHANGE_VSFILTER",
    arg: vsFilter
  };
};

export const ActionCheckTodo: (id: number) => Action = id => {
  return {
    type: "CHECK_TODO",
    arg: id
  };
};
