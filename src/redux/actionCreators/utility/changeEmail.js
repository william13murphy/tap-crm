import { createAction } from 'redux-actions';
import { postChangeEmail } from 'api';

// Action type constants
export const POST_START = 'utility/changeEmail/POST_START';
export const POST_SUCCESS = 'utility/changeEmail/POST_SUCCESS';
export const POST_FAIL = 'utility/changeEmail/POST_FAIL';
export const FORM_RESET = 'utility/changeEmail/FORM_RESET';

// Action objects
export const changeEmailPostStart = createAction(POST_START);
export const changeEmailPostSuccess = createAction(POST_SUCCESS);
export const changeEmailPostFail = createAction(POST_FAIL);
export const changeEmailFormReset = createAction(FORM_RESET);

// Post thunk
type changeEmailResetParameters = {
  id: string,
  password: string,
};

export function changeEmail(formData: changeEmailResetParameters) {
  return dispatch => {
    dispatch(changeEmailPostStart());
    postChangeEmail(formData.id, formData.email)
      .done(payload => {
        dispatch(changeEmailPostSuccess(payload));
      })
      .fail(error => {
        dispatch(changeEmailPostFail(error));
      });
  };
}
