import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FORM_RESET,
} from 'src/redux/actionCreators/administration/nonEfcUsersSearch';

import createFetchReducer from 'src/redux/reducers/createFetchReducer';

export default createFetchReducer({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FORM_RESET,
});
