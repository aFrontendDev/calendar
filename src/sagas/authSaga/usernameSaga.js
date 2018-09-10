import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchCheckUsername(username) {

  return fetch(`http://localhost:3000/api/auth/userexists?user=${username}`)
    .then(res => {
      return res.json().then(json => {
        if (json.exists) {
          return {available: false};
        } else {
          return {available: true};
        }
      })
    })
}

function* callCheckUsernameSaga(action) {
  const { username } = action.payload;

  try {
    const response = yield call(fetchCheckUsername, username);
    const usernameAvailable = response.available;

    yield put(authActions.checkUsernameSuccess({usernameAvailable}));
  } catch (checkUsernameError) {
    yield put(authActions.checkUsernameFailure({checkUsernameError}));
  }
}

export default callCheckUsernameSaga;