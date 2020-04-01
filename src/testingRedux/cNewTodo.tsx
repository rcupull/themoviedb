import React from "react";
import { AddTodoCreate } from "./actionUtils";
import { connect } from "react-redux";
import PNewTodo from "./pNewTodo";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleAddTodo: (text: string) => {
      dispatch(AddTodoCreate(text));
    }
  };
};

const CNewTodo = connect(mapStateToProps, mapDispatchToProps)(PNewTodo);

export default CNewTodo;
