import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import Movies from "./components/movies";
import * as serviceWorker from "./serviceWorker";
// import AllTodo from "./testingRedux/allTodo";
import { RootReducer } from "./reducers/rootReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Movies />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(<AllTodo />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
