// Creates a fetch reducer, which will fetch many items.
// This type of fetch reducer accumulates the id's of the fetched items on the payload.
import { emptyFetchState } from 'src/redux/emptyState';
import { fetchStatus } from 'src/redux/status';

const createManyFetchReducer = ({
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
          payload: Object.assign({}, state.payload, {
            [action.payload.id]: action.payload.data,
          }),
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
        return Object.assign({}, state, emptyFetchState);
      default:
        return state;
    }
  };
};

export default createManyFetchReducer;
