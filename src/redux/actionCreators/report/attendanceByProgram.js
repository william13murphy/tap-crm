import { createAction } from 'redux-actions';
import { getStudentAttendanceByProgram } from 'api';

// Action type constants
export const FETCH_START = 'report/attendanceByProgram/FETCH_START';
export const FETCH_SUCCESS = 'report/attendanceByProgram/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/attendanceByProgram/FETCH_FAIL';
export const RESET_STATE = 'report/attendanceByProgram/RESET_STATE';

// Action objects
export const attendanceByProgramFetchStart = createAction(FETCH_START);
export const attendanceByProgramFetchSuccess = createAction(FETCH_SUCCESS);
export const attendanceByProgramFetchFail = createAction(FETCH_FAIL);
export const attendanceByProgramResetState = createAction(RESET_STATE);

export function attendanceByProgramFetch(id: string) {
  return dispatch => {
    dispatch(attendanceByProgramFetchStart());

    getStudentAttendanceByProgram((id: string))
      .done(payload => {
        dispatch(attendanceByProgramFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(attendanceByProgramFetchFail(error));
      });
  };
}
