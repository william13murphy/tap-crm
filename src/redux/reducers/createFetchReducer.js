// Creates a generic fetch reducer with standard action objects.
import { emptyFetchState } from 'src/redux/emptyState';
import { fetchStatus } from 'src/redux/status';

const createFetchReducer = ({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
}) => {
  return (state, action) => {
    switch (action.type) {
      case FETCH_START:
        return Object.assign({}, state, {
          status: fetchStatus.FETCH_START,
          fetching: true,
        });
      case FETCH_SUCCESS:
        return Object.assign({}, state, {
          status: fetchStatus.FETCH_SUCCESS,
          payload: action.payload,
          fetching: false,
        });
      case FETCH_FAIL:
        return Object.assign({}, state, {
          status: fetchStatus.FETCH_FAIL,
          payload: action.payload,
          fetching: false,
          error: true,
        });
      case RESET_STATE:
        return Object.assign({}, emptyFetchState);
      default:
        return state;
    }
  };
};

export default createFetchReducer;
