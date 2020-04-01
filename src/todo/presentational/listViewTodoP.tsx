import * as React from "react";
import { Todo } from "../utils/todoStateControl";
import ViewTodoP from "./viewTodoP";

export interface StateListViewTodoP {
  todoArray: Todo[];
}
export interface DispatchListViewTodoP {
  handleChangeActive: (id: number) => void;
}

export interface ListViewTodoPProps
  extends StateListViewTodoP,
    DispatchListViewTodoP {}

const ListViewTodoP: React.SFC<ListViewTodoPProps> = ({
  todoArray,
  handleChangeActive
}) => {
  return (
    <React.Fragment>
      {todoArray.map(todo => (
        <ViewTodoP
          todo={todo}
          handleChangeActive={handleChangeActive}
          key={todo.id}
        />
      ))}
    </React.Fragment>
  );
};

export default ListViewTodoP;
