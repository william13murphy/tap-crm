import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from 'src/redux/actionCreators/school/clockInOuts';

import createFetchReducer from 'src/redux/reducers/createFetchReducer';

export default createFetchReducer({ FETCH_START, FETCH_SUCCESS, FETCH_FAIL });
