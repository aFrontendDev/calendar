import { all } from "redux-saga/effects"
import dogSaga from "./sagas/dogSaga/dogSaga";

function* rootSaga() {
  yield all([
    dogSaga()
  ]);
}

export default rootSaga;