import { call, put } from "redux-saga/effects";
import * as eventsActions from "../../actions/events/eventActions";

function fetchGetEvents(token) {

  return fetch(`http://localhost:3000/api/auth/userevents`, {
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

function* callGetEventsSagaSaga(action) {
  const { token } = action.payload;

  try {
    const response = yield call(fetchGetEvents, token);
    const eventsData = response;

    if (eventsData) {
      yield put(eventsActions.getUserEventsSuccess(eventsData));
    } else {
      yield put(eventsActions.getUserEventsFailure({error: "events not found"}));

    }
  } catch (checkEventsError) {
    yield put(eventsActions.getUserEventsFailure({checkEventsError}));
  }
}

export default callGetEventsSagaSaga;