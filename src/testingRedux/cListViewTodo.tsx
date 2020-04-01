import React from "react";
import { Todo, AllTodoState } from "./reducers";
import { visibilityFilters, ToggleTodoCreate } from "./actionUtils";
import { connect } from "react-redux";
import PViewTodo from "./ViewTodo";
import ListViewTodo from "./pListViewTodo";
import _ from "lodash";

const getTodosForView = (todoArray: Todo[], filter: visibilityFilters) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return _.filter(todoArray, todo => {
        return todo.completed === true;
      });
    case "SHOW_ACTIVE":
      return _.filter(todoArray, todo => {
        return todo.completed === false;
      });
    case "SHOW_ALL":
    default:
      return todoArray;
  }
};

const mapStatetoProps = (state: AllTodoState) => {
  return {
    todoArray: getTodosForView(state.todoArray, state.vsFilter)
  };
};

const mapDispatchtoProps = (dispatch: any) => {
  return {
    handleCheck: (id: number) => {
      dispatch(ToggleTodoCreate(id));
    }
  };
};

const CListViewTodo = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ListViewTodo);

export default CListViewTodo;
