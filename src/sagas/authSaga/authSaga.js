import { takeLatest } from "redux-saga/effects";
import callRegisterSaga from "./registerSaga";
import { REGISTER_REQUEST } from "../../actions/auth/authActions";

function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, callRegisterSaga);
}


export default authSaga;