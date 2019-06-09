import {
  FORM_RESET,
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
} from 'src/redux/actionCreators/utility/changeEmail';

import createPostReducer from 'src/redux/reducers/createPostReducer';

export default createPostReducer({
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  FORM_RESET,
});
