import { createAction } from 'redux-actions';
import { postEfcUserSMSTemplate, deleteEfcUserSMSTemplate } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserSMSTemplatePost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserSMSTemplatePost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserSMSTemplatePost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserSMSTemplatePost/FORM_RESET';

// Action objects
export const efcUserSMSTemplatePostStart = createAction(POST_START);
export const efcUserSMSTemplatePostSuccess = createAction(POST_SUCCESS);
export const efcUserSMSTemplatePostFail = createAction(POST_FAIL);
export const efcUserSMSTemplatePostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserSMSTemplatePost(formData) {
  return dispatch => {
    dispatch(efcUserSMSTemplatePostStart());

    postEfcUserSMSTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserSMSTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserSMSTemplatePostFail(error));
      });
  };
}

export function efcUserSMSTemplateDelete(formData) {
  return dispatch => {
    dispatch(efcUserSMSTemplatePostStart());

    deleteEfcUserSMSTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserSMSTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserSMSTemplatePostFail(error));
      });
  };
}
