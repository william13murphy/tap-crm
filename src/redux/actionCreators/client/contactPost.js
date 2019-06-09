import { createAction } from 'redux-actions';
import { saveClientContact } from 'api';

// Action type constants
export const POST_START = 'client/contactPost/POST_START';
export const POST_SUCCESS = 'client/contactPost/POST_SUCCESS';
export const POST_FAIL = 'client/contactPost/POST_FAIL';
export const FORM_RESET = 'client/contactPost/FORM_RESET';

// Action objects
export const clientContactPostStart = createAction(POST_START);
export const clientContactPostSuccess = createAction(POST_SUCCESS);
export const clientContactPostFail = createAction(POST_FAIL);
export const clientContactFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientContactPost(formData) {
  return dispatch => {
    dispatch(clientContactPostStart());

    saveClientContact(formData)
      .done(() => {
        dispatch(clientContactPostSuccess());
      })
      .fail(error => {
        dispatch(clientContactPostFail(error));
      });
  };
}
