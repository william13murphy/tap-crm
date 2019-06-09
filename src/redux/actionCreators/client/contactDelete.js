import { createAction } from 'redux-actions';
import { deleteClientContact } from 'api';

// Action type constants
export const POST_START = 'client/contactDelete/POST_START';
export const POST_SUCCESS = 'client/contactDelete/POST_SUCCESS';
export const POST_FAIL = 'client/contactDelete/POST_FAIL';
export const FORM_RESET = 'client/contactDelete/FORM_RESET';

// Action objects
export const clientContactDeleteStart = createAction(POST_START);
export const clientContactDeleteSuccess = createAction(POST_SUCCESS);
export const clientContactDeleteFail = createAction(POST_FAIL);
export const clientContactDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientContactDelete(formData) {
  return dispatch => {
    dispatch(clientContactDeleteStart());

    deleteClientContact(formData)
      .done(payload => {
        dispatch(clientContactDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(clientContactDeleteFail(error));
      });
  };
}
