import { call, put } from "redux-saga/effects";
import * as dogActions from "../../actions/dogAction/getDogActions";

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return fetch("https://dog.ceo/api/breeds/image/random", { method: 'get' })
    .then(res => {
      return res.json()
        .then(json => {
          return json;
        })
    })
}

function* fetchDogSaga(action) {

  try {
    const response = yield call(fetchDog);
    const dog = response.message;

    // dispatch a success action to the store with the new dog
    yield put(dogActions.fetchDogSuccess({dog}));

  } catch (err) {
    yield put(dogActions.fetchDogFailure({err}));
  }
}

export default fetchDogSaga;