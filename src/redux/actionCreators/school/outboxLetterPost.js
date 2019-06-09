import { createAction } from 'redux-actions';
import { postSchoolOutboxLetter } from 'api';

// Action type constants
export const POST_START = 'school/outboxLetterPost/POST_START';
export const POST_SUCCESS = 'school/outboxLetterPost/POST_SUCCESS';
export const POST_FAIL = 'school/outboxLetterPost/POST_FAIL';
export const FORM_RESET = 'school/outboxLetterPost/FORM_RESET';

// Action objects
export const schoolOutboxLetterPostStart = createAction(POST_START);
export const schoolOutboxLetterPostSuccess = createAction(POST_SUCCESS);
export const schoolOutboxLetterPostFail = createAction(POST_FAIL);
export const schoolOutboxLetterFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolOutboxLetterPost(formData) {
  return dispatch => {
    dispatch(schoolOutboxLetterPostStart());

    postSchoolOutboxLetter(formData)
      .done(payload => {
        dispatch(schoolOutboxLetterPostSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolOutboxLetterPostFail(error));
      });
  };
}
