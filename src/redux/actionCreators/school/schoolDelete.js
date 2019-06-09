import { createAction } from 'redux-actions';
import { deleteSchool } from 'api';

// Action type constants
export const POST_START = 'school/schoolDelete/POST_START';
export const POST_SUCCESS = 'school/schoolDelete/POST_SUCCESS';
export const POST_FAIL = 'school/schoolDelete/POST_FAIL';
export const FORM_RESET = 'school/schoolDelete/FORM_RESET';

// Action objects
export const schoolDeleteStart = createAction(POST_START);
export const schoolDeleteSuccess = createAction(POST_SUCCESS);
export const schoolDeleteFail = createAction(POST_FAIL);
export const schoolDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolDelete(formData) {
  return dispatch => {
    dispatch(schoolDeleteStart());

    deleteSchool(formData)
      .done(payload => {
        dispatch(schoolDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolDeleteFail(error));
      });
  };
}
