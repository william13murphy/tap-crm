import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
} from 'src/redux/actionCreators/administration/efcUserEmailTemplates';

import createFetchReducer from 'src/redux/reducers/createFetchReducer';

export default createFetchReducer({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
});
