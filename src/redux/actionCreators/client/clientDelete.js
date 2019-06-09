import { createAction } from 'redux-actions';
import { deleteClient } from 'api';

// Action type constants
export const POST_START = 'client/clientDelete/POST_START';
export const POST_SUCCESS = 'client/clientDelete/POST_SUCCESS';
export const POST_FAIL = 'client/clientDelete/POST_FAIL';
export const FORM_RESET = 'client/clientDelete/FORM_RESET';

// Action objects
export const clientDeleteStart = createAction(POST_START);
export const clientDeleteSuccess = createAction(POST_SUCCESS);
export const clientDeleteFail = createAction(POST_FAIL);
export const clientDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientDelete(formData) {
  return dispatch => {
    dispatch(clientDeleteStart());

    deleteClient(formData)
      .done(payload => {
        dispatch(clientDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(clientDeleteFail(error));
      });
  };
}
