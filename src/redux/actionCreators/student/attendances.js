import { createAction } from 'redux-actions';
import { getStudentAttendances } from 'api';

// Action type constants
export const FETCH_START = 'student/attendances/FETCH_START';
export const FETCH_SUCCESS = 'student/attendances/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/attendances/FETCH_FAIL';
export const RESET_STATE = 'school/attendances/RESET_STATE';

// Action objects
export const studentAttendancesFetchStart = createAction(FETCH_START);
export const studentAttendancesFetchSuccess = createAction(FETCH_SUCCESS);
export const studentAttendancesFetchFail = createAction(FETCH_FAIL);
export const studentAttendancesResetState = createAction(RESET_STATE);

export function studentAttendancesFetch(id: string) {
  return dispatch => {
    dispatch(studentAttendancesFetchStart());

    getStudentAttendances((id: string))
      .done(payload => {
        dispatch(studentAttendancesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentAttendancesFetchFail(error));
      });
  };
}
