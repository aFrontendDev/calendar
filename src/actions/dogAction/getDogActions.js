export const API_CALL_REQUEST = "API_CALL_REQUEST";
export const fetchDog = () => ({
  type: API_CALL_REQUEST
});

export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const fetchDogSuccess = ({dog}) => ({
  type: API_CALL_SUCCESS,
  dog
});

export const API_CALL_FAILURE = "API_CALL_FAILURE";
export const fetchDogFailure = ({error}) => ({
  type: API_CALL_FAILURE,
  error
});
