import * as React from "react";
import { Reducer, combineReducers } from "redux";
import { Action } from "./actions";
import _ from "lodash";
export interface Todo {
  id: number;
  text: string;
  active: boolean;
}

export type VsFilter = "VIEW_ALL" | "VIEW_ACTIVE" | "VIEW_COMPLETED";

export type StateArrayTodo = Todo[];

const TodoArrayReducer: Reducer<StateArrayTodo> = (state = [], action) => {
  let amountTodo = state.length;
  let stateTmp = [...state];

  switch (action.type) {
    case "ADD_TODO":
      let id: number = amountTodo === 0 ? 0 : state[amountTodo - 1].id + 1;
      stateTmp.push({
        id: id,
        active: true,
        text: action.arg.toString()
      });
      return stateTmp;

    case "CHECK_TODO":
      let index: number = _.findIndex(state, obj => {
        return obj.id === action.arg;
      });
      stateTmp[index].active = false;
      return stateTmp;
    default:
      return state;
  }
};

export type StateVsFilter = VsFilter;
const VsFilterReducer: Reducer<StateVsFilter> = (
  state = "VIEW_ALL",
  action
) => {
  console.log("action", action);
  switch (action.type) {
    case "CHANGE_VSFILTER":
      return action.arg;
    default:
      return state;
  }
};

export interface StateTodoReducer {
  vsFilter: StateVsFilter;
  todoArray: StateArrayTodo;
}

export const TodoReducer: Reducer<StateTodoReducer> = combineReducers({
  vsFilter: VsFilterReducer,
  todoArray: TodoArrayReducer
});

// export const TodoReducer = combineReducers<StateTodoReducer>({
//   vsFilter: VsFilterReducer,
//   todoArray: TodoArrayReducer
// });
