import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
} from 'src/redux/actionCreators/school/styleRateAdditionalClassesMany';

import createManyFetchReducer from 'src/redux/reducers/createManyFetchReducer';

export default createManyFetchReducer({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
});
