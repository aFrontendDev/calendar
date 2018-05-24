import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchRegister(name, password, email) {

  return fetch("http://localhost:3000/api/auth/register", {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify({
      name,
      password, 
      email
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
  const {username, password, email} = action.payload;

  try {
    const response = yield call(fetchRegister, username, password, email);
    const auth = response;

    yield put(authActions.registerSuccess({auth}));
  } catch (err) {
    yield put(authActions.registerFailure({err}));
  }
}

export default callRegisterSaga;