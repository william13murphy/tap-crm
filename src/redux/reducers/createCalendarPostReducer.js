// Creates a generic post reducer with standard action objects.

const createPostReducer = ({
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  FORM_RESET,
}) => {
  return (state, action) => {
    switch (action.type) {
      case FORM_RESET:
        return Object.assign({}, state, {
          status: null,
          payload: null,
          fetching: false,
          error: false,
        });
      case POST_START:
        return Object.assign({}, state, {
          status: POST_START,
          fetching: true,
          error: false,
        });
      case POST_SUCCESS:
        return Object.assign({}, state, {
          status: POST_SUCCESS,
          payload: action.payload,
          fetching: false,
          error: false,
        });
      case POST_FAIL:
        return Object.assign({}, state, {
          status: POST_FAIL,
          payload: action.payload,
          fetching: false,
          error: true,
        });
      default:
        return state;
    }
  };
};

export default createPostReducer;
