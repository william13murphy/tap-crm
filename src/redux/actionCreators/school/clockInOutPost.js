import { createAction } from 'redux-actions';
import { postSchoolClockInOut } from 'api';

// Action type constants
export const POST_START = 'school/clockInOutPost/POST_START';
export const POST_SUCCESS = 'school/clockInOutPost/POST_SUCCESS';
export const POST_FAIL = 'school/clockInOutPost/POST_FAIL';
export const FORM_RESET = 'school/clockInOutPost/FORM_RESET';

// Action objects
export const schoolClockInOutPostStart = createAction(POST_START);
export const schoolClockInOutPostSuccess = createAction(POST_SUCCESS);
export const schoolClockInOutPostFail = createAction(POST_FAIL);
export const schoolClockInOutPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolClockInOutPost(formData) {
  return dispatch => {
    dispatch(schoolClockInOutPostStart());

    postSchoolClockInOut(formData)
      .done(payload => {
        dispatch(schoolClockInOutPostSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClockInOutPostFail(error));
      });
  };
}
