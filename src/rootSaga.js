import { all } from "redux-saga/effects"
import authSaga from "./sagas/authSaga/authSaga";
import eventsSaga from "./sagas/eventsSaga/eventsSaga";

function* rootSaga() {
  yield all([
    authSaga(),
    eventsSaga()
  ]);
}

export default rootSaga;