import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchCheckUsername(username) {

  return fetch(`http://localhost:3000/api/auth/user?user=${username}`)
    .then(res => {
      if (res.status === 204) {
        return true;
      } else {
        return false;
      }
    })
}

function* callCheckUsernameSaga(action) {
  const { username } = action.payload;

  try {
    const response = yield call(fetchCheckUsername, username);
    const usernameAvailable = response;

    yield put(authActions.checkUsernameSuccess({usernameAvailable}));
  } catch (checkUsernameError) {
    yield put(authActions.checkUsernameFailure({checkUsernameError}));
  }
}

export default callCheckUsernameSaga;