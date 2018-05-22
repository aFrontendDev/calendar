import { takeLatest } from "redux-saga/effects";
import fetchDogSaga from "./getDogSaga";
import { API_CALL_REQUEST } from "../../actions/dogAction/getDogActions";

// watcher saga: watches for actions dispatched to the store, starts fetchDogSaga
function* dogSaga() {
  yield takeLatest(API_CALL_REQUEST, fetchDogSaga);
}


export default dogSaga;