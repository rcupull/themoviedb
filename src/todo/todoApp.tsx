import * as React from "react";
import { createStore } from "redux";
import { TodoReducer } from "./utils/todoStateControl";
import { Provider } from "react-redux";
import { Row, Col } from "react-bootstrap";
import FilterC from "./container/filterC";
import ListViewTodoC from "./container/listViewTodoC";
import NewTodoC from "./container/newTodoC";
const store = createStore(TodoReducer);

const StoreLayout = (props: any) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export interface TodoAppProps {}

const TodoApp: React.SFC<TodoAppProps> = () => {
  return (
    <StoreLayout>
      <Row>
        <Col sm={2}>{<NewTodoC />}</Col>
        <Col sm={6}>{<ListViewTodoC />} </Col>
        <Col sm={2}>{<FilterC />} </Col>
      </Row>
    </StoreLayout>
  );
};

export default TodoApp;
