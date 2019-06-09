import { createAction } from 'redux-actions';
import { saveClientAddress } from 'api';

// Action type constants
export const POST_START = 'client/addressPost/POST_START';
export const POST_SUCCESS = 'client/addressPost/POST_SUCCESS';
export const POST_FAIL = 'client/addressPost/POST_FAIL';
export const FORM_RESET = 'client/addressPost/FORM_RESET';

// Action objects
export const clientAddressPostStart = createAction(POST_START);
export const clientAddressPostSuccess = createAction(POST_SUCCESS);
export const clientAddressPostFail = createAction(POST_FAIL);
export const clientAddressFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientAddressPost(formData) {
  return dispatch => {
    dispatch(clientAddressPostStart());

    saveClientAddress(formData)
      .done(() => {
        dispatch(clientAddressPostSuccess());
      })
      .fail(error => {
        dispatch(clientAddressPostFail(error));
      });
  };
}
