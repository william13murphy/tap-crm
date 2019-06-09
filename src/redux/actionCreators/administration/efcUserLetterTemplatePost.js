import { createAction } from 'redux-actions';
import { postEfcUserLetterTemplate, deleteEfcUserLetterTemplate } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserLetterTemplatePost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserLetterTemplatePost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserLetterTemplatePost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserLetterTemplatePost/FORM_RESET';

// Action objects
export const efcUserLetterTemplatePostStart = createAction(POST_START);
export const efcUserLetterTemplatePostSuccess = createAction(POST_SUCCESS);
export const efcUserLetterTemplatePostFail = createAction(POST_FAIL);
export const efcUserLetterTemplatePostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserLetterTemplatePost(formData) {
  return dispatch => {
    dispatch(efcUserLetterTemplatePostStart());

    postEfcUserLetterTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserLetterTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserLetterTemplatePostFail(error));
      });
  };
}

export function efcUserLetterTemplateDelete(formData) {
  return dispatch => {
    dispatch(efcUserLetterTemplatePostStart());

    deleteEfcUserLetterTemplate(formData)
      .done(userId => {
        dispatch(
          efcUserLetterTemplatePostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserLetterTemplatePostFail(error));
      });
  };
}
