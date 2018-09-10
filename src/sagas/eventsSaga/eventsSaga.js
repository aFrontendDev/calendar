import { all, takeLatest } from "redux-saga/effects";
import callGetEventsSagaSaga from "./getEventsSaga";
import { GETUSEREVENTS_REQUEST } from "../../actions/events/eventActions";

function* eventsSaga() {
  yield all([
    takeLatest(GETUSEREVENTS_REQUEST, callGetEventsSagaSaga)
  ]);
}


export default eventsSaga;