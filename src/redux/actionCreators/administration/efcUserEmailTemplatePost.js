import { createAction } from 'redux-actions';
import { postEfcUserEmailTemplate, deleteEfcUserEmailTemplate } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserEmailTemplatePost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserEmailTemplatePost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserEmailTemplatePost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserEmailTemplatePost/FORM_RESET';

// Action objects
export const efcUserEmailTemplatePostStart = createAction(POST_START);
export const efcUserEmailTemplatePostSuccess = createAction(POST_SUCCESS);
export const efcUserEmailTemplatePostFail = createAction(POST_FAIL);
export const efcUserEmailTemplatePostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserEmailTemplatePost(formData) {
  return dispatch => {
    dispatch(efcUserEmailTemplatePostStart());

    postEfcUserEmailTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserEmailTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserEmailTemplatePostFail(error));
      });
  };
}

export function efcUserEmailTemplateDelete(formData) {
  return dispatch => {
    dispatch(efcUserEmailTemplatePostStart());

    deleteEfcUserEmailTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserEmailTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserEmailTemplatePostFail(error));
      });
  };
}
