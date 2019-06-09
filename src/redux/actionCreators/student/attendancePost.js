import { createAction } from 'redux-actions';
import { saveStudentAttendance } from 'api';

// Action type constants
export const POST_START = 'student/attendancePost/POST_START';
export const POST_SUCCESS = 'student/attendancePost/POST_SUCCESS';
export const POST_FAIL = 'student/attendancePost/POST_FAIL';
export const FORM_RESET = 'student/attendancePost/FORM_RESET';

// Action objects
export const studentAttendancePostStart = createAction(POST_START);
export const studentAttendancePostSuccess = createAction(POST_SUCCESS);
export const studentAttendancePostFail = createAction(POST_FAIL);
export const studentAttendancePostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentAttendancePost(formData) {
  return dispatch => {
    dispatch(studentAttendancePostStart());

    saveStudentAttendance(formData)
      .done(() => {
        dispatch(studentAttendancePostSuccess());
      })
      .fail(error => {
        dispatch(studentAttendancePostFail(error));
      });
  };
}
