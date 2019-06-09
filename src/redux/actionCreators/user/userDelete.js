import { createAction } from 'redux-actions';
import { deleteUser } from 'api';

// Action type constants
export const POST_START = 'user/userDelete/POST_START';
export const POST_SUCCESS = 'user/userDelete/POST_SUCCESS';
export const POST_FAIL = 'user/userDelete/POST_FAIL';
export const FORM_RESET = 'user/userDelete/FORM_RESET';

// Action objects
export const userDeleteStart = createAction(POST_START);
export const userDeleteSuccess = createAction(POST_SUCCESS);
export const userDeleteFail = createAction(POST_FAIL);
export const userDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function userDelete(formData) {
  return dispatch => {
    dispatch(userDeleteStart());

    deleteUser(formData)
      .done(payload => {
        dispatch(userDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(userDeleteFail(error));
      });
  };
}
