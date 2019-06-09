import { createAction } from 'redux-actions';
import { postPerfectAttendanceByStyleByDate } from 'api';

// Action type constants
export const POST_START = 'school/perfectAttendanceByStyleByDate/POST_START';
export const POST_SUCCESS =
  'school/perfectAttendanceByStyleByDate/POST_SUCCESS';
export const POST_FAIL = 'school/perfectAttendanceByStyleByDate/POST_FAIL';
export const FORM_RESET = 'school/perfectAttendanceByStyleByDate/FORM_RESET';

// Action objects
export const perfectAttendanceByStyleByDatePostStart = createAction(POST_START);
export const perfectAttendanceByStyleByDatePostSuccess = createAction(
  POST_SUCCESS
);
export const perfectAttendanceByStyleByDatePostFail = createAction(POST_FAIL);
export const perfectAttendanceByStyleByDateResetState = createAction(
  FORM_RESET
);

// Thunk action objects
export function perfectAttendanceByStyleByDatePost(formData) {
  return dispatch => {
    dispatch(perfectAttendanceByStyleByDatePostStart());

    postPerfectAttendanceByStyleByDate(formData)
      .done(data => {
        dispatch(perfectAttendanceByStyleByDatePostSuccess(data));
      })
      .fail(error => {
        dispatch(perfectAttendanceByStyleByDatePostFail(error));
      });
  };
}
