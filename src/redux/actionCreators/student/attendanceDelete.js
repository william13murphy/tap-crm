import { createAction } from 'redux-actions';
import { deleteStudentAttendance } from 'api';

// Action type constants
export const POST_START = 'student/attendanceDelete/POST_START';
export const POST_SUCCESS = 'student/attendanceDelete/POST_SUCCESS';
export const POST_FAIL = 'student/attendanceDelete/POST_FAIL';
export const FORM_RESET = 'student/attendanceDelete/FORM_RESET';

// Action objects
export const studentAttendanceDeleteStart = createAction(POST_START);
export const studentAttendanceDeleteSuccess = createAction(POST_SUCCESS);
export const studentAttendanceDeleteFail = createAction(POST_FAIL);
export const studentAttendanceDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentAttendanceDelete(formData) {
  return dispatch => {
    dispatch(studentAttendanceDeleteStart());

    deleteStudentAttendance({ Id: formData.Id })
      .done(payload => {
        dispatch(studentAttendanceDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentAttendanceDeleteFail(error));
      });
  };
}
