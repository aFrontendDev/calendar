import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchRegister(username, password) {

  return fetch("http://localhost:3000/api/auth/register", {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => {
      return res.json()
        .then(json => {
          return json;
        })
    })
}

function* callRegisterSaga(action) {
  const {username, password} = action.payload;

  try {
    const response = yield call(fetchRegister, username, password);
    const auth = response;

    yield put(authActions.registerSuccess({auth}));
  } catch (err) {
    yield put(authActions.registerFailure({err}));
  }
}

export default callRegisterSaga;