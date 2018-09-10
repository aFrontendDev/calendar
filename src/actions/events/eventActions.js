// users events
export const GETUSEREVENTS_REQUEST = "GETUSEREVENTS_REQUEST";
export const getUserEventsRequest = (token) => ({
  type: GETUSEREVENTS_REQUEST,
  payload: {
    token
  }
});

export const GETUSEREVENTS_SUCCESS = "GETUSEREVENTS_SUCCESS";
export const getUserEventsSuccess = eventsData => ({
  type: GETUSEREVENTS_SUCCESS,
  eventsData
});

export const GETUSEREVENTS_FAILURE = "GETUSEREVENTS_FAILURE";
export const getUserEventsFailure = error => ({
  type: GETUSEREVENTS_FAILURE,
  error
});