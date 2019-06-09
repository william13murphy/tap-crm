import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
} from 'src/redux/actionCreators/pos/customer';

export default function(state, action) {
  switch (action.type) {
    case FETCH_START:
      return Object.assign({}, state, {
        status: FETCH_START,
        fetching: true,
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        status: FETCH_SUCCESS,
        payload: action.payload,
        fetching: false,
      });
    case FETCH_FAIL:
      return Object.assign({}, state, {
        status: FETCH_FAIL,
        payload: action.payload,
        fetching: false,
        error: true,
      });
    case RESET_STATE:
      return Object.assign({}, state, { payload: { screen: {} } });
    default:
      return state;
  }
}
