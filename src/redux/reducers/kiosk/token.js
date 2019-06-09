import {
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  TOKEN_RESET,
  FROM_CACHE,
} from 'src/redux/actionCreators/kiosk/token';

const token = (state, action) => {
  switch (action.type) {
    case TOKEN_RESET:
      return Object.assign({}, state, {
        status: null,
        payload: null,
        fetching: false,
        error: false,
      });
    case FROM_CACHE:
      return Object.assign({}, state, {
        status: FROM_CACHE,
        payload: action.payload,
        fetching: false,
      });
    case POST_START:
      return Object.assign({}, state, {
        status: POST_START,
        fetching: true,
      });
    case POST_SUCCESS:
      return Object.assign({}, state, {
        status: POST_SUCCESS,
        payload: action.payload,
        fetching: false,
      });
    case POST_FAIL:
      return Object.assign({}, state, {
        status: POST_FAIL,
        payload: {
          errorObject: action.payload,
        },
        fetching: false,
        error: true,
      });
    default:
      return state;
  }
};

export default token;
