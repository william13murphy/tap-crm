import { createAction } from 'redux-actions';
import { saveSchoolContact } from 'api';

// Action type constants
export const POST_START = 'school/contactPost/POST_START';
export const POST_SUCCESS = 'school/contactPost/POST_SUCCESS';
export const POST_FAIL = 'school/contactPost/POST_FAIL';
export const FORM_RESET = 'school/contactPost/FORM_RESET';

// Action objects
export const schoolContactPostStart = createAction(POST_START);
export const schoolContactPostSuccess = createAction(POST_SUCCESS);
export const schoolContactPostFail = createAction(POST_FAIL);
export const schoolContactFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolContactPost(formData) {
  return dispatch => {
    dispatch(schoolContactPostStart());

    saveSchoolContact(formData)
      .done(() => {
        dispatch(schoolContactPostSuccess());
      })
      .fail(error => {
        dispatch(schoolContactPostFail(error));
      });
  };
}
