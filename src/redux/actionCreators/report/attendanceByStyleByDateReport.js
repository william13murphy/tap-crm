import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'pos/attendanceByStyleByDateReport/FETCH_START';
export const FETCH_SUCCESS = 'pos/attendanceByStyleByDateReport/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/attendanceByStyleByDateReport/FETCH_FAIL';
export const RESET_STATE = 'pos/attendanceByStyleByDateReport/RESET_STATE';

// Action objects
export const attendanceByStyleByDateReportFetchStart = createAction(
  FETCH_START
);
export const attendanceByStyleByDateReportFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const attendanceByStyleByDateReportFetchFail = createAction(FETCH_FAIL);
export const attendanceByStyleByDateReportResetState = createAction(
  RESET_STATE
);

export function attendanceByStyleByDateReportUpdate(payload) {
  return dispatch => {
    dispatch(attendanceByStyleByDateReportFetchSuccess(payload));
  };
}

export function attendanceByStyleByDateReportReset() {
  return dispatch => {
    dispatch(attendanceByStyleByDateReportResetState());
  };
}
