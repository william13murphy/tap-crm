import { createAction } from 'redux-actions';
import { postEfcUserEmailOutbox } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserEmailOutboxPost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserEmailOutboxPost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserEmailOutboxPost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserEmailOutboxPost/FORM_RESET';

// Action objects
export const efcUserEmailOutboxPostStart = createAction(POST_START);
export const efcUserEmailOutboxPostSuccess = createAction(POST_SUCCESS);
export const efcUserEmailOutboxPostFail = createAction(POST_FAIL);
export const efcUserEmailOutboxPostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserEmailOutboxPost(formData) {
  return dispatch => {
    dispatch(efcUserEmailOutboxPostStart());

    postEfcUserEmailOutbox(formData)
      .done(userId => {
        dispatch(
          efcUserEmailOutboxPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserEmailOutboxPostFail(error));
      });
  };
}
