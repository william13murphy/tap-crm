import { createAction } from 'redux-actions';
import { createEmailTemplate, updateEmailTemplate } from 'api';

// Action type constants
export const POST_START = 'utility/templateEmailPost/POST_START';
export const POST_SUCCESS = 'utility/templateEmailPost/POST_SUCCESS';
export const POST_FAIL = 'utility/templateEmailPost/POST_FAIL';
export const FORM_RESET = 'utility/templateEmailPost/FORM_RESET';

// Action objects
export const templateEmailPostStart = createAction(POST_START);
export const templateEmailPostSuccess = createAction(POST_SUCCESS);
export const templateEmailPostFail = createAction(POST_FAIL);
export const templateEmailFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateEmailCreate(formData) {
  return dispatch => {
    dispatch(templateEmailPostStart());

    createEmailTemplate(formData)
      .done(() => {
        dispatch(templateEmailPostSuccess());
      })
      .fail(error => {
        dispatch(templateEmailPostFail(error));
      });
  };
}

export function templateEmailUpdate(formData) {
  return dispatch => {
    dispatch(templateEmailPostStart());

    updateEmailTemplate(formData)
      .done(() => {
        dispatch(templateEmailPostSuccess());
      })
      .fail(error => {
        dispatch(templateEmailPostFail(error));
      });
  };
}
