import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./loaders/reportWebVitals";
import { RouterHandler } from "./components/RouterHandler";
import { Provider } from "react-redux";
import { store } from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <RouterHandler />
  </Provider>,
  document.getElementById("app")
);

reportWebVitals();
