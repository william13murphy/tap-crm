import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
} from 'src/redux/actionCreators/report/studentUnpaid';

import createFetchReducer from 'src/redux/reducers/createFetchReducer';

export default createFetchReducer({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
});
