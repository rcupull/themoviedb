import * as React from "react";
import _ from "lodash";
import ListViewTodoP, {
  DispatchListViewTodoP,
  StateListViewTodoP
} from "../presentational/listViewTodoP";
import { connect } from "react-redux";
import {
  StateTodoReducer,
  StateArrayTodo,
  VsFilter
} from "../utils/todoStateControl";
import { ActionCheckTodo } from "../utils/actions";

const getTodoArrayFiltered: (
  todoArray: StateArrayTodo,
  vsFilter: VsFilter
) => StateArrayTodo = (todoArray, vsFilter) => {
  console.log(vsFilter);
  switch (vsFilter) {
    case "VIEW_ACTIVE":
      return _.filter(todoArray, todo => {
        return todo.active === true;
      });
    case "VIEW_COMPLETED":
      return _.filter(todoArray, todo => {
        return todo.active === false;
      });
    case "VIEW_ALL":
    default:
      return todoArray;
  }
};

export const mapStateToProps: (
  state: StateTodoReducer
) => StateListViewTodoP = state => {
  return {
    todoArray: getTodoArrayFiltered(state.todoArray, state.vsFilter)
  };
};

export const mapDispatchToProps: (
  dispatch: any
) => DispatchListViewTodoP = dispatch => {
  return {
    handleChangeActive: (id: number) => {
      dispatch(ActionCheckTodo(id));
    }
  };
};

const ListViewTodoC = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListViewTodoP);

export default ListViewTodoC;
