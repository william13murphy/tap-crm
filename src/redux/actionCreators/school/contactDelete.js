import { createAction } from 'redux-actions';
import { deleteSchoolContact } from 'api';

// Action type constants
export const POST_START = 'school/contactDelete/POST_START';
export const POST_SUCCESS = 'school/contactDelete/POST_SUCCESS';
export const POST_FAIL = 'school/contactDelete/POST_FAIL';
export const FORM_RESET = 'school/contactDelete/FORM_RESET';

// Action objects
export const schoolContactDeleteStart = createAction(POST_START);
export const schoolContactDeleteSuccess = createAction(POST_SUCCESS);
export const schoolContactDeleteFail = createAction(POST_FAIL);
export const schoolContactDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolContactDelete(formData) {
  return dispatch => {
    dispatch(schoolContactDeleteStart());

    deleteSchoolContact(formData)
      .done(payload => {
        dispatch(schoolContactDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolContactDeleteFail(error));
      });
  };
}
