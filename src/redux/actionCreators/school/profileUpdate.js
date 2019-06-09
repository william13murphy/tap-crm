import { createAction } from 'redux-actions';
import { updateSchoolProfile } from 'api';

// Action type constants
export const POST_START = 'school/profileUpdate/POST_START';
export const POST_SUCCESS = 'school/profileUpdate/POST_SUCCESS';
export const POST_FAIL = 'school/profileUpdate/POST_FAIL';
export const FORM_RESET = 'school/profileUpdate/FORM_RESET';

// Action objects
export const schoolProfileUpdateStart = createAction(POST_START);
export const schoolProfileUpdateSuccess = createAction(POST_SUCCESS);
export const schoolProfileUpdateFail = createAction(POST_FAIL);
export const schoolProfileFormReset = createAction(FORM_RESET);

export function schoolProfileUpdate(formData) {
  return dispatch => {
    dispatch(schoolProfileUpdateStart());

    updateSchoolProfile(formData)
      .done(schoolProfile => {
        dispatch(schoolProfileUpdateSuccess(schoolProfile));
      })
      .fail(error => {
        dispatch(schoolProfileUpdateFail(error));
      });
  };
}
