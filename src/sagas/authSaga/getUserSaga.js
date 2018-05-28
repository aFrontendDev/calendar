import { call, put } from "redux-saga/effects";
import * as authActions from "../../actions/auth/authActions";

function fetchGetUser(username, token) {

  return fetch(`http://localhost:3000/api/auth/user?user=${username}`, {
    headers: new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': token,
    })
  })
    .then(res => {
      if (res.status === 404) {
        return null;
      }

      return res.json()
        .then(json => {
          return json;
        })
    })
}

function* callGetUserSaga(action) {
  const { username, token } = action.payload;

  try {
    const response = yield call(fetchGetUser, username, token);
    const user = response;

    if (user) {
      yield put(authActions.getUserSuccess(user));
    } else {
      yield put(authActions.getUserFailure({error: "user not found"}));

    }
  } catch (checkUsernameError) {
    yield put(authActions.checkUsernameFailure({checkUsernameError}));
  }
}

export default callGetUserSaga;