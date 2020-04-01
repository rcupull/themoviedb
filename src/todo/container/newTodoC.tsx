import * as React from "react";
import { ActionAddTodo } from "../utils/actions";
import NewTodoP, {
  NewTodoPDispatch,
  NewTodoPState
} from "../presentational/newTodoP";
import { StateTodoReducer } from "../utils/todoStateControl";
import { connect } from "react-redux";

export const mapStateToProps: (
  state: StateTodoReducer
) => NewTodoPState = state => {
  return {};
};

export const mapDispatchToProps: (
  dispatch: any
) => NewTodoPDispatch = dispatch => {
  return {
    handleAddTodo: (text: string) => {
      dispatch(ActionAddTodo(text));
    }
  };
};

const NewTodoC = connect(mapStateToProps, mapDispatchToProps)(NewTodoP);

export default NewTodoC;
