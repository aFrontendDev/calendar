import {
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE
} from "../../actions/dogAction/getDogActions";

// reducer with initial state
const initialState = {
  fetching: false,
  dog: null,
  error: null
};

const dogReducer = (state = initialState, action) => {
  const {type, dog, error} = action;

  switch (type) {
    case API_CALL_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
      break;
    case API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        dog
      };
      break;
    case API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        dog: null,
        error
      };
      break;
    default:
      return state;
  }
};

export default dogReducer;