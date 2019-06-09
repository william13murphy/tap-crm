import { createAction } from 'redux-actions';
import { postChangePassword } from 'api';

// Action type constants
export const POST_START = 'utility/changePassword/POST_START';
export const POST_SUCCESS = 'utility/changePassword/POST_SUCCESS';
export const POST_FAIL = 'utility/changePassword/POST_FAIL';
export const FORM_RESET = 'utility/changePassword/FORM_RESET';

// Action objects
export const changePasswordPostStart = createAction(POST_START);
export const changePasswordPostSuccess = createAction(POST_SUCCESS);
export const changePasswordPostFail = createAction(POST_FAIL);
export const changePasswordFormReset = createAction(FORM_RESET);

// Post thunk
type changePasswordResetParameters = {
  id: string,
  password: string,
};

export function changePassword(formData: changePasswordResetParameters) {
  return dispatch => {
    dispatch(changePasswordPostStart());
    postChangePassword(formData.id, formData.oldPassword, formData.newPassword)
      .done(payload => {
        dispatch(changePasswordPostSuccess(payload));
      })
      .fail(error => {
        dispatch(changePasswordPostFail(error));
      });
  };
}
