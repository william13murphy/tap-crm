import { createAction } from 'redux-actions';
import { createUser, updateUser } from 'api';

// Action type constants
export const POST_START = 'administration/userPost/POST_START';
export const POST_SUCCESS = 'administration/userPost/POST_SUCCESS';
export const POST_FAIL = 'administration/userPost/POST_FAIL';
export const FORM_RESET = 'administration/userPost/FORM_RESET';

// Action objects
export const userPostStart = createAction(POST_START);
export const userPostSuccess = createAction(POST_SUCCESS);
export const userPostFail = createAction(POST_FAIL);
export const userFormReset = createAction(FORM_RESET);

// Thunk action objects
export function userCreate(formData) {
  return dispatch => {
    dispatch(userPostStart());

    createUser(formData)
      .done(userId => {
        dispatch(
          userPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(userPostFail(error));
      });
  };
}

// Thunk action objects
export function userUpdate(formData) {
  return dispatch => {
    dispatch(userPostStart());

    updateUser(formData)
      .done(userId => {
        dispatch(
          userPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(userPostFail(error));
      });
  };
}
