import {
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  FORM_RESET,
} from 'src/redux/actionCreators/school/styleRateAdditionalClassPost';

import createPostReducer from 'src/redux/reducers/createPostReducer';

export default createPostReducer({
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
  FORM_RESET,
});
