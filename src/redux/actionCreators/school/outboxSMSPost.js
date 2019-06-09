import { createAction } from 'redux-actions';
import { postSchoolOutboxSMS } from 'api';

// Action type constants
export const POST_START = 'school/outboxSMSPost/POST_START';
export const POST_SUCCESS = 'school/outboxSMSPost/POST_SUCCESS';
export const POST_FAIL = 'school/outboxSMSPost/POST_FAIL';
export const FORM_RESET = 'school/outboxSMSPost/FORM_RESET';

// Action objects
export const schoolOutboxSMSPostStart = createAction(POST_START);
export const schoolOutboxSMSPostSuccess = createAction(POST_SUCCESS);
export const schoolOutboxSMSPostFail = createAction(POST_FAIL);
export const schoolOutboxSMSFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolOutboxSMSPost(formData) {
  return dispatch => {
    dispatch(schoolOutboxSMSPostStart());

    postSchoolOutboxSMS(formData)
      .done(() => {
        dispatch(schoolOutboxSMSPostSuccess());
      })
      .fail(error => {
        dispatch(schoolOutboxSMSPostFail(error));
      });
  };
}
