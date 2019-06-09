import { createAction } from 'redux-actions';
import { postResetPassword } from 'api';

// Action type constants
export const POST_START = 'utility/resetPassword/POST_START';
export const POST_SUCCESS = 'utility/resetPassword/POST_SUCCESS';
export const POST_FAIL = 'utility/resetPassword/POST_FAIL';
export const FORM_RESET = 'utility/resetPassword/FORM_RESET';

// Action objects
export const resetPasswordPostStart = createAction(POST_START);
export const resetPasswordPostSuccess = createAction(POST_SUCCESS);
export const resetPasswordPostFail = createAction(POST_FAIL);
export const resetPasswordFormReset = createAction(FORM_RESET);

// Post thunk
type resetPasswordResetParameters = {
  id: string,
  password: string,
};

export function resetPassword(formData: resetPasswordResetParameters) {
  return dispatch => {
    dispatch(resetPasswordPostStart());
    postResetPassword(formData.id, formData.password)
      .done(payload => {
        dispatch(resetPasswordPostSuccess(payload));
      })
      .fail(error => {
        dispatch(resetPasswordPostFail(error));
      });
  };
}
