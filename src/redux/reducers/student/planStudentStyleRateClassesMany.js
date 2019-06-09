import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from 'src/redux/actionCreators/student/planStudentStyleRateClassesMany';

import createFetchReducer from 'src/redux/reducers/createNewManyFetchReducer';

export default createFetchReducer({ FETCH_START, FETCH_SUCCESS, FETCH_FAIL });
