import { createAction } from 'redux-actions';
import { postEfcUserLetterOutbox } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserLetterOutboxPost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserLetterOutboxPost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserLetterOutboxPost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserLetterOutboxPost/FORM_RESET';

// Action objects
export const efcUserLetterOutboxPostStart = createAction(POST_START);
export const efcUserLetterOutboxPostSuccess = createAction(POST_SUCCESS);
export const efcUserLetterOutboxPostFail = createAction(POST_FAIL);
export const efcUserLetterOutboxPostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserLetterOutboxPost(formData) {
  return dispatch => {
    dispatch(efcUserLetterOutboxPostStart());

    postEfcUserLetterOutbox(formData)
      .done(userId => {
        dispatch(
          efcUserLetterOutboxPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserLetterOutboxPostFail(error));
      });
  };
}
