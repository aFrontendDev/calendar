import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchCheckLoggedin(token) {

  return fetch(`http://localhost:3000/api/auth/authorized`, {
    headers: new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': token,
    })
  })
    .then(res => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
}

function* callCheckLoggedinSaga(action) {
  const { token } = action.payload;

  try {
    const response = yield call(fetchCheckLoggedin, token);
    const isLoggedin = response;

    yield put(authActions.checkLoggedinSuccess({isLoggedin}));
  } catch (loggedinError) {
    yield put(authActions.checkLoggedinFailure({loggedinError}));
  }
}

export default callCheckLoggedinSaga;