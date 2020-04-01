import React from "react";
import {
  visibilityFilters,
  Action,
  AddTodoCreate,
  ToggleTodoCreate,
  SetVisibilityFilterCreate
} from "./actionUtils";
import _ from "lodash";

import { Row, Col } from "react-bootstrap";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MainReducer, AllTodoState, Todo } from "./reducers";
import CListViewTodo from "./cListViewTodo";
import CNewTodo from "./cNewTodo";
import CFilter from "./cFilter";

const store = createStore(MainReducer);

export interface AllTodoProps {}
class AllTodo extends React.Component<AllTodoProps, AllTodoState> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = { todoArray: [], vsFilter: "SHOW_ALL" };
  //   // store.subscribe(this.handleUpdateState);
  // }

  // handleUpdateState = () => {
  //   this.setState(store.getState());
  // };

  // handleAddTodo = (text: string) => {
  //   let action: Action = AddTodoCreate(text);
  //   store.dispatch(action);

  //   // this.setState(MainReducer(this.state, action));
  // };

  // handleCheck = (id: number) => {
  //   let action: Action = ToggleTodoCreate(id);

  //   store.dispatch(action);

  //   // this.setState(MainReducer(this.state, action));
  //   // console.log("id", id);
  // };

  // handleChangeVsFilter = (optionVsFilter: visibilityFilters) => {
  //   let action: Action = SetVisibilityFilterCreate(optionVsFilter);
  //   store.dispatch(action);
  // };
  render() {
    return (
      <Provider store={store}>
        <Row>
          <Col sm={2}>
            <CNewTodo />
            {/* <NewTodo handleAddTodo={this.handleAddTodo} /> */}
          </Col>
          <Col sm={6}>
            <CListViewTodo />
            {/* <ListViewTodo
            handleCheck={this.handleCheck}
            todoArray={getTodosForView(
              this.state.todoArray,
              this.state.vsFilter
            )}
          /> */}
          </Col>
          <Col>
            <CFilter />
            {/* <Filter
            vsFilter={this.state.vsFilter}
            handleChangeVsFilter={this.handleChangeVsFilter}
          /> */}
          </Col>
        </Row>
      </Provider>
    );
  }
}

export default AllTodo;
