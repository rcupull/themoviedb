import React from "react";
import { visibilityFilters } from "./actionUtils";
import _ from "lodash";
import { combineReducers, Reducer } from "redux";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface AllTodoState {
  todoArray: Todo[];
  vsFilter: visibilityFilters;
}

const TodoArrayReducer: Reducer<Todo[]> = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      let newId: number = state.length ? state[state.length - 1].id + 1 : 0;
      let todoObj: Todo = {
        id: newId,
        text: action.arg.toString(),
        completed: false
      };
      return [...state, todoObj];
    case "TOGGLE_TODO":
      let index: number = _.findIndex(state, todo => {
        return todo.id === action.arg;
      });
      let tmp_todoArray: Todo[] = [...state];
      tmp_todoArray[index].completed = true;
      return tmp_todoArray;
    default:
      return state;
  }
};

const VisibilityFilterReducer: Reducer<visibilityFilters> = (
  state = "SHOW_ALL",
  action
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.arg.toString();
    default:
      return state;
  }
};

export const MainReducer = combineReducers<AllTodoState>({
  vsFilter: VisibilityFilterReducer,
  todoArray: TodoArrayReducer
});

//   switch (action.type) {
//     case "ADD_TODO":
//     case "TOGGLE_TODO":
//       return Object.assign({}, state, {
//         todoArray: TodoArrayReducer(state.todoArray, action)
//       });
//     case "SET_VISIBILITY_FILTER":
//       return Object.assign({}, state, {
//         vsFilter: SetVisibilityFilterReducer(state.vsFilter, action)
//       });
//     default:
//       return state;
//   }
// };
