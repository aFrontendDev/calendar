import {
  GETUSEREVENTS_REQUEST,
  GETUSEREVENTS_SUCCESS,
  GETUSEREVENTS_FAILURE
} from "../../actions/events/eventActions";

// reducer with initial state
const initialState = {
  fetching: false,
  eventsData: null,
};

const eventsReducer = (state = initialState, action) => {
  const {type, error, eventsData} = action;

  switch (type) {
    case GETUSEREVENTS_REQUEST:
      return {
        ...state,
        gettingEvents: true,
        error: null
      };
      break;
    case GETUSEREVENTS_SUCCESS:
      return {
        ...state,
        gettingEvents: false,
        eventsData
      };
      break;
    case GETUSEREVENTS_FAILURE:
      return {
        ...state,
        gettingEvents: false,
        eventsData: null,
        error
      };
      break;

    default:
      return state;
  }
};

export default eventsReducer;