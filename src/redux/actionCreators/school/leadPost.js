import { createAction } from 'redux-actions';
import { saveSchoolLead } from 'api';

// Action type constants
export const POST_START = 'school/leadPost/POST_START';
export const POST_SUCCESS = 'school/leadPost/POST_SUCCESS';
export const POST_FAIL = 'school/leadPost/POST_FAIL';
export const FORM_RESET = 'school/leadPost/FORM_RESET';

// Action objects
export const schoolLeadPostStart = createAction(POST_START);
export const schoolLeadPostSuccess = createAction(POST_SUCCESS);
export const schoolLeadPostFail = createAction(POST_FAIL);
export const schoolLeadPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolLeadPost(formData) {
  return dispatch => {
    dispatch(schoolLeadPostStart());

    saveSchoolLead(formData)
      .done(() => {
        dispatch(schoolLeadPostSuccess());
      })
      .fail(error => {
        dispatch(schoolLeadPostFail(error));
      });
  };
}
