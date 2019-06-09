import { createAction } from 'redux-actions';
import { saveSchoolStyle } from 'api';

// Action type constants
export const POST_START = 'school/stylePost/POST_START';
export const POST_SUCCESS = 'school/stylePost/POST_SUCCESS';
export const POST_FAIL = 'school/stylePost/POST_FAIL';
export const FORM_RESET = 'school/stylePost/FORM_RESET';

// Action objects
export const schoolStylePostStart = createAction(POST_START);
export const schoolStylePostSuccess = createAction(POST_SUCCESS);
export const schoolStylePostFail = createAction(POST_FAIL);
export const schoolStyleFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolStylePost(formData) {
  return dispatch => {
    dispatch(schoolStylePostStart());

    saveSchoolStyle(formData)
      .done(payload => {
        dispatch(schoolStylePostSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolStylePostFail(error));
      });
  };
}
