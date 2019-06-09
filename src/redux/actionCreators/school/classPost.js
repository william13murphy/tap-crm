import { createAction } from 'redux-actions';
import { saveSchoolClass } from 'api';

// Action type constants
export const POST_START = 'school/classPost/POST_START';
export const POST_SUCCESS = 'school/classPost/POST_SUCCESS';
export const POST_FAIL = 'school/classPost/POST_FAIL';
export const FORM_RESET = 'school/classPost/FORM_RESET';

// Action objects
export const schoolClassPostStart = createAction(POST_START);
export const schoolClassPostSuccess = createAction(POST_SUCCESS);
export const schoolClassPostFail = createAction(POST_FAIL);
export const schoolClassFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolClassPost(formData) {
  return dispatch => {
    dispatch(schoolClassPostStart());

    saveSchoolClass(formData)
      .done(() => {
        dispatch(schoolClassPostSuccess());
      })
      .fail(error => {
        dispatch(schoolClassPostFail(error));
      });
  };
}
