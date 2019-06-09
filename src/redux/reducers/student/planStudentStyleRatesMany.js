import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from 'src/redux/actionCreators/student/planStudentStyleRatesMany';

import createFetchReducer from 'src/redux/reducers/createNewManyFetchReducer';

export default createFetchReducer({ FETCH_START, FETCH_SUCCESS, FETCH_FAIL });
