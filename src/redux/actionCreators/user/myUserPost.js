import { createAction } from 'redux-actions';
import { updateMyUser } from 'api';

// Action type constants
export const POST_START = 'administration/myUserPost/POST_START';
export const POST_SUCCESS = 'administration/myUserPost/POST_SUCCESS';
export const POST_FAIL = 'administration/myUserPost/POST_FAIL';
export const FORM_RESET = 'administration/myUserPost/FORM_RESET';

// Action objects
export const myUserPostStart = createAction(POST_START);
export const myUserPostSuccess = createAction(POST_SUCCESS);
export const myUserPostFail = createAction(POST_FAIL);
export const myUserFormReset = createAction(FORM_RESET);

// Thunk action objects
export function myUserUpdate(formData) {
  return dispatch => {
    dispatch(myUserPostStart());

    updateMyUser(formData)
      .done(userId => {
        dispatch(
          myUserPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(myUserPostFail(error));
      });
  };
}
