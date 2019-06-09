import { createAction } from 'redux-actions';
import { createSMSTemplate, updateSMSTemplate } from 'api';

// Action type constants
export const POST_START = 'utility/templateSMSPost/POST_START';
export const POST_SUCCESS = 'utility/templateSMSPost/POST_SUCCESS';
export const POST_FAIL = 'utility/templateSMSPost/POST_FAIL';
export const FORM_RESET = 'utility/templateSMSPost/FORM_RESET';

// Action objects
export const templateSMSPostStart = createAction(POST_START);
export const templateSMSPostSuccess = createAction(POST_SUCCESS);
export const templateSMSPostFail = createAction(POST_FAIL);
export const templateSMSFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateSMSCreate(formData) {
  return dispatch => {
    dispatch(templateSMSPostStart());

    createSMSTemplate(formData)
      .done(() => {
        dispatch(templateSMSPostSuccess());
      })
      .fail(error => {
        dispatch(templateSMSPostFail(error));
      });
  };
}

export function templateSMSUpdate(formData) {
  return dispatch => {
    dispatch(templateSMSPostStart());

    updateSMSTemplate(formData)
      .done(() => {
        dispatch(templateSMSPostSuccess());
      })
      .fail(error => {
        dispatch(templateSMSPostFail(error));
      });
  };
}
