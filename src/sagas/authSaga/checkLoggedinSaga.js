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
        return res.json()

          .then(json => {
            // console.log({json})
            const authorized = json.auth;

            if (authorized) {
              const username = json.name;
              return {
                loggedin: true,
                username
              } 
            } else {
              return {
                loggedin: false,
                username: null
              };
            }
          })
      } else {
        return {
          loggedin: false,
          username: null
        };
      }
    })
    .catch(err => {
      console.log({err})
    })
}

function* callCheckLoggedinSaga(action) {
  const { token } = action.payload;

  try {
    const response = yield call(fetchCheckLoggedin, token);
    const loggedInObject = response;

    yield put(authActions.checkLoggedinSuccess({
      isLoggedin: loggedInObject.loggedin,
      username: loggedInObject.username
    }));
  } catch (loggedinError) {
    console.log({loggedinError})
    yield put(authActions.checkLoggedinFailure({loggedinError}));
  }
}

export default callCheckLoggedinSaga;