import { createAction } from 'redux-actions';
import { postRequestPassword } from 'api';

// Action type constants
export const POST_START = 'utility/requestPassword/POST_START';
export const POST_SUCCESS = 'utility/requestPassword/POST_SUCCESS';
export const POST_FAIL = 'utility/requestPassword/POST_FAIL';
export const FORM_RESET = 'utility/requestPassword/FORM_RESET';

// Action objects
export const requestPasswordPostStart = createAction(POST_START);
export const requestPasswordPostSuccess = createAction(POST_SUCCESS);
export const requestPasswordPostFail = createAction(POST_FAIL);
export const requestPasswordFormReset = createAction(FORM_RESET);

// Post thunk
type requestPasswordResetParameters = {
  userName: string,
};

export function requestPassword(formData: requestPasswordResetParameters) {
  return dispatch => {
    dispatch(requestPasswordPostStart());

    postRequestPassword(formData)
      .done(payload => {
        dispatch(requestPasswordPostSuccess(payload));
      })
      .fail(error => {
        dispatch(requestPasswordPostFail(error));
      });
  };
}
