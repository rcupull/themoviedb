import * as React from "react";

export type actionType =
  | "ADD_TODO"
  | "REMOVE_TODO"
  | "TOGGLE_TODO"
  | "SET_VISIBILITY_FILTER";

export type visibilityFilters = "SHOW_ALL" | "SHOW_COMPLETED" | "SHOW_ACTIVE";

export interface Action {
  type: actionType;
  arg: string | number;
}

/////////////////////////////////////////FUNCTIONS////////////////////////////////////////////
export const AddTodoCreate: (text: string) => Action = text => {
  return { type: "ADD_TODO", arg: text };
};

export const RemoveTodoCreate: (id: number) => Action = id => {
  return { type: "REMOVE_TODO", arg: id };
};

export const ToggleTodoCreate: (id: number) => Action = id => {
  return { type: "TOGGLE_TODO", arg: id };
};
export const SetVisibilityFilterCreate: (
  filter: visibilityFilters
) => Action = filter => {
  return { type: "SET_VISIBILITY_FILTER", arg: filter };
};
