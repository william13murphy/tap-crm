// Creates a fetch reducer, which will fetch many items.
// This type of fetch reducer accumulates the id's of the fetched items on the payload.
// Designed for use with GenericManyFetchContainer.

import { emptyFetchState } from 'src/redux/emptyState';
import { fetchStatus } from 'src/redux/status';

const createManyFetchReducer = ({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
  DELETE_KEY,
}) => {
  return (state, action) => {
    switch (action.type) {
      case FETCH_SUCCESS:
        return Object.assign({}, state, {
          status: Object.assign({}, state.status, {
            [action.payload.id]: fetchStatus.FETCH_SUCCESS,
          }),
          payload: Object.assign({}, state.payload, {
            [action.payload.id]: action.payload.data,
          }),
          fetching: Object.assign({}, state.fetching, {
            [action.payload.id]: false,
          }),
        });
      case FETCH_FAIL:
        return Object.assign({}, state, {
          status: Object.assign({}, state.status, {
            [action.payload.id]: fetchStatus.FETCH_FAIL,
          }),
          payload: Object.assign({}, state.payload, {
            [action.payload.id]: action.payload.data,
          }),
          fetching: Object.assign({}, state.fetching, {
            [action.payload.id]: false,
          }),
          error: Object.assign({}, state.error, {
            [action.payload.id]: true,
          }),
        });
      case RESET_STATE:
        return Object.assign({}, state, emptyFetchState);
      case DELETE_KEY: {
        const newState = Object.assign({}, state);
        delete newState[action.payload.id];

        return newState;
      }
      default:
        return state;
    }
  };
};

export default createManyFetchReducer;
