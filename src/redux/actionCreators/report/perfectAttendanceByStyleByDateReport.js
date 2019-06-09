import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START =
  'pos/perfectAttendanceByStyleByDateReport/FETCH_START';
export const FETCH_SUCCESS =
  'pos/perfectAttendanceByStyleByDateReport/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/perfectAttendanceByStyleByDateReport/FETCH_FAIL';
export const RESET_STATE =
  'pos/perfectAttendanceByStyleByDateReport/RESET_STATE';

// Action objects
export const perfectAttendanceByStyleByDateReportFetchStart = createAction(
  FETCH_START
);
export const perfectAttendanceByStyleByDateReportFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const perfectAttendanceByStyleByDateReportFetchFail = createAction(
  FETCH_FAIL
);
export const perfectAttendanceByStyleByDateReportResetState = createAction(
  RESET_STATE
);

export function perfectAttendanceByStyleByDateReportUpdate(payload) {
  return dispatch => {
    dispatch(perfectAttendanceByStyleByDateReportFetchSuccess(payload));
  };
}

export function perfectAttendanceByStyleByDateReportReset() {
  return dispatch => {
    dispatch(perfectAttendanceByStyleByDateReportResetState());
  };
}
