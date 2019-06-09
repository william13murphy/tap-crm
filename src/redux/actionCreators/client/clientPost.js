import { createAction } from 'redux-actions';
import { createClient, updateClient } from 'api';

// Action type constants
export const POST_START = 'client/clientPost/POST_START';
export const POST_SUCCESS = 'client/clientPost/POST_SUCCESS';
export const POST_FAIL = 'client/clientPost/POST_FAIL';
export const FORM_RESET = 'client/clientPost/FORM_RESET';

// Action objects
export const clientPostStart = createAction(POST_START);
export const clientPostSuccess = createAction(POST_SUCCESS);
export const clientPostFail = createAction(POST_FAIL);
export const clientFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientCreate(formData) {
  return dispatch => {
    dispatch(clientPostStart());

    createClient(formData)
      .done(clientId => {
        dispatch(
          clientPostSuccess({
            clientId,
          })
        );
      })
      .fail(error => {
        dispatch(clientPostFail(error));
      });
  };
}

export function clientUpdate(formData) {
  return dispatch => {
    dispatch(clientPostStart());

    updateClient(formData)
      .done(clientId => {
        dispatch(
          clientPostSuccess({
            clientId,
          })
        );
      })
      .fail(error => {
        dispatch(clientPostFail(error));
      });
  };
}
