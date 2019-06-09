import { createAction } from 'redux-actions';
import { deleteSchoolSMSTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateSMSDelete/POST_START';
export const POST_SUCCESS = 'school/templateSMSDelete/POST_SUCCESS';
export const POST_FAIL = 'school/templateSMSDelete/POST_FAIL';
export const FORM_RESET = 'school/templateSMSDelete/FORM_RESET';

// Action objects
export const templateSMSDeleteStart = createAction(POST_START);
export const templateSMSDeleteSuccess = createAction(POST_SUCCESS);
export const templateSMSDeleteFail = createAction(POST_FAIL);
export const templateSMSFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateSMSDelete(formData) {
  return dispatch => {
    dispatch(templateSMSDeleteStart());

    deleteSchoolSMSTemplate(formData)
      .done(payload => {
        dispatch(templateSMSDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(templateSMSDeleteFail(error));
      });
  };
}
