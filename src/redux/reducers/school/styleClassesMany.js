import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
} from 'src/redux/actionCreators/school/styleClassesMany';

import createManyFetchReducer from 'src/redux/reducers/createNewManyFetchReducer';

export default createManyFetchReducer({
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  RESET_STATE,
});
