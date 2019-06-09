import { createAction } from 'redux-actions';
import { saveStudentWaiver } from 'api';

// Action type constants
export const POST_START = 'student/waiverPost/POST_START';
export const POST_SUCCESS = 'student/waiverPost/POST_SUCCESS';
export const POST_FAIL = 'student/waiverPost/POST_FAIL';
export const FORM_RESET = 'student/waiverPost/FORM_RESET';

// Action objects
export const studentWaiverPostStart = createAction(POST_START);
export const studentWaiverPostSuccess = createAction(POST_SUCCESS);
export const studentWaiverPostFail = createAction(POST_FAIL);
export const studentWaiverPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentWaiverPost(formData) {
  return dispatch => {
    dispatch(studentWaiverPostStart());

    saveStudentWaiver(formData)
      .done(id => {
        dispatch(studentWaiverPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentWaiverPostFail(error));
      });
  };
}
