import { createAction } from 'redux-actions';
import { saveSchoolSMSTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateSMSPost/POST_START';
export const POST_SUCCESS = 'school/templateSMSPost/POST_SUCCESS';
export const POST_FAIL = 'school/templateSMSPost/POST_FAIL';
export const FORM_RESET = 'school/templateSMSPost/FORM_RESET';

// Action objects
export const templateSMSPostStart = createAction(POST_START);
export const templateSMSPostSuccess = createAction(POST_SUCCESS);
export const templateSMSPostFail = createAction(POST_FAIL);
export const templateSMSFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateSMSSave(formData) {
  return dispatch => {
    dispatch(templateSMSPostStart());

    saveSchoolSMSTemplate(formData)
      .done(payload => {
        dispatch(templateSMSPostSuccess(payload));
      })
      .fail(error => {
        dispatch(templateSMSPostFail(error));
      });
  };
}
