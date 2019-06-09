import { createAction } from 'redux-actions';
import { postSchoolOutboxEmail } from 'api';

// Action type constants
export const POST_START = 'school/outboxEmailPost/POST_START';
export const POST_SUCCESS = 'school/outboxEmailPost/POST_SUCCESS';
export const POST_FAIL = 'school/outboxEmailPost/POST_FAIL';
export const FORM_RESET = 'school/outboxEmailPost/FORM_RESET';

// Action objects
export const schoolOutboxEmailPostStart = createAction(POST_START);
export const schoolOutboxEmailPostSuccess = createAction(POST_SUCCESS);
export const schoolOutboxEmailPostFail = createAction(POST_FAIL);
export const schoolOutboxEmailFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolOutboxEmailPost(formData) {
  return dispatch => {
    dispatch(schoolOutboxEmailPostStart());

    postSchoolOutboxEmail(formData)
      .done(() => {
        dispatch(schoolOutboxEmailPostSuccess());
      })
      .fail(error => {
        dispatch(schoolOutboxEmailPostFail(error));
      });
  };
}
