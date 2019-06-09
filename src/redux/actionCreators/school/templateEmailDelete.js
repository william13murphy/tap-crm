import { createAction } from 'redux-actions';
import { deleteSchoolEmailTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateEmailDelete/POST_START';
export const POST_SUCCESS = 'school/templateEmailDelete/POST_SUCCESS';
export const POST_FAIL = 'school/templateEmailDelete/POST_FAIL';
export const FORM_RESET = 'school/templateEmailDelete/FORM_RESET';

// Action objects
export const templateEmailDeleteStart = createAction(POST_START);
export const templateEmailDeleteSuccess = createAction(POST_SUCCESS);
export const templateEmailDeleteFail = createAction(POST_FAIL);
export const templateEmailFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateEmailDelete(formData) {
  return dispatch => {
    dispatch(templateEmailDeleteStart());

    deleteSchoolEmailTemplate(formData)
      .done(payload => {
        dispatch(templateEmailDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(templateEmailDeleteFail(error));
      });
  };
}
