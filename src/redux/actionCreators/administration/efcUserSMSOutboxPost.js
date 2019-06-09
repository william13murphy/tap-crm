import { createAction } from 'redux-actions';
import { postEfcUserSMSOutbox } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserSMSOutboxPost/POST_START';
export const POST_SUCCESS = 'administration/efcUserSMSOutboxPost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserSMSOutboxPost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserSMSOutboxPost/FORM_RESET';

// Action objects
export const efcUserSMSOutboxPostStart = createAction(POST_START);
export const efcUserSMSOutboxPostSuccess = createAction(POST_SUCCESS);
export const efcUserSMSOutboxPostFail = createAction(POST_FAIL);
export const efcUserSMSOutboxPostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserSMSOutboxPost(formData) {
  return dispatch => {
    dispatch(efcUserSMSOutboxPostStart());

    postEfcUserSMSOutbox(formData)
      .done(userId => {
        dispatch(
          efcUserSMSOutboxPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserSMSOutboxPostFail(error));
      });
  };
}
