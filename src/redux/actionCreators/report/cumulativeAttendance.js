import { createAction } from 'redux-actions';
import { getStudentCumulativeAttendance } from 'api';

// Action type constants
export const FETCH_START = 'report/cumulativeAttendance/FETCH_START';
export const FETCH_SUCCESS = 'report/cumulativeAttendance/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/cumulativeAttendance/FETCH_FAIL';
export const RESET_STATE = 'report/cumulativeAttendance/RESET_STATE';

// Action objects
export const cumulativeAttendanceFetchStart = createAction(FETCH_START);
export const cumulativeAttendanceFetchSuccess = createAction(FETCH_SUCCESS);
export const cumulativeAttendanceFetchFail = createAction(FETCH_FAIL);
export const cumulativeAttendanceResetState = createAction(RESET_STATE);

export function cumulativeAttendanceFetch(id: string) {
  return dispatch => {
    dispatch(cumulativeAttendanceFetchStart());

    getStudentCumulativeAttendance((id: string))
      .done(payload => {
        dispatch(cumulativeAttendanceFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(cumulativeAttendanceFetchFail(error));
      });
  };
}
