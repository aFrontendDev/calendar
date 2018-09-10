import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

import App from "./app.jsx";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  rootReducer,
  compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))
);

// run the saga
sagaMiddleware.run(rootSaga);

// import style from './_styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
