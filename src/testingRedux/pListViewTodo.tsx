import React, { Fragment } from "react";
import { Todo } from "./reducers";
import ViewTodo from "./ViewTodo";

export interface PListViewTodoProps {
  todoArray: Todo[];
  handleCheck: (id: number) => void;
}

const PListViewTodo: React.SFC<PListViewTodoProps> = ({
  todoArray,
  handleCheck
}) => {
  return (
    <Fragment>
      {todoArray.map(todo => (
        <ViewTodo key={todo.id} todo={todo} handleCheck={handleCheck} />
      ))}
    </Fragment>
  );
};

export default PListViewTodo;
