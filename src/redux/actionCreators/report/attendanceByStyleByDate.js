import { createAction } from 'redux-actions';
import { postAttendanceByStyleByDate } from 'api';

// Action type constants
export const POST_START = 'school/attendanceByStyleByDate/POST_START';
export const POST_SUCCESS = 'school/attendanceByStyleByDate/POST_SUCCESS';
export const POST_FAIL = 'school/attendanceByStyleByDate/POST_FAIL';
export const FORM_RESET = 'school/attendanceByStyleByDate/FORM_RESET';

// Action objects
export const attendanceByStyleByDatePostStart = createAction(POST_START);
export const attendanceByStyleByDatePostSuccess = createAction(POST_SUCCESS);
export const attendanceByStyleByDatePostFail = createAction(POST_FAIL);
export const attendanceByStyleByDateResetState = createAction(FORM_RESET);

// Thunk action objects
export function attendanceByStyleByDatePost(formData) {
  return dispatch => {
    dispatch(attendanceByStyleByDatePostStart());

    postAttendanceByStyleByDate(formData)
      .done(data => {
        dispatch(attendanceByStyleByDatePostSuccess(data));
      })
      .fail(error => {
        dispatch(attendanceByStyleByDatePostFail(error));
      });
  };
}
