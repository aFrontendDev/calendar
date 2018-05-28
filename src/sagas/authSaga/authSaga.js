import { all, takeLatest } from "redux-saga/effects";
import callRegisterSaga from "./registerSaga";
import callCheckUsernameSaga from "./usernameSaga";
import callCheckLoggedinSaga from "./checkLoggedinSaga";
import callLoginSaga from "./loginSaga";
import callGetUserSaga from "./getUserSaga";
import { REGISTER_REQUEST, USERNAME_REQUEST, ISLOGGEDIN_REQUEST, LOGIN_REQUEST, GETUSER_REQUEST} from "../../actions/auth/authActions";

function* authSaga() {
  yield all([
    takeLatest(REGISTER_REQUEST, callRegisterSaga),
    takeLatest(USERNAME_REQUEST, callCheckUsernameSaga),
    takeLatest(ISLOGGEDIN_REQUEST, callCheckLoggedinSaga),
    takeLatest(LOGIN_REQUEST, callLoginSaga),
    takeLatest(GETUSER_REQUEST, callGetUserSaga)
  ]);
}


export default authSaga;