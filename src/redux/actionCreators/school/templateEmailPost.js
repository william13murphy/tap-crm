import { createAction } from 'redux-actions';
import { saveSchoolEmailTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateEmailPost/POST_START';
export const POST_SUCCESS = 'school/templateEmailPost/POST_SUCCESS';
export const POST_FAIL = 'school/templateEmailPost/POST_FAIL';
export const FORM_RESET = 'school/templateEmailPost/FORM_RESET';

// Action objects
export const templateEmailPostStart = createAction(POST_START);
export const templateEmailPostSuccess = createAction(POST_SUCCESS);
export const templateEmailPostFail = createAction(POST_FAIL);
export const templateEmailFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateEmailSave(formData) {
  return dispatch => {
    dispatch(templateEmailPostStart());

    saveSchoolEmailTemplate(formData)
      .done(payload => {
        dispatch(templateEmailPostSuccess(payload));
      })
      .fail(error => {
        dispatch(templateEmailPostFail(error));
      });
  };
}
