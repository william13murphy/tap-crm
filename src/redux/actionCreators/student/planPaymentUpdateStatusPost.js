import { createAction } from 'redux-actions';
import { updateStudentPlanPaymentUpdateStatus } from 'api';

// Action type constants
export const POST_START = 'student/planPaymentUpdateStatusPost/POST_START';
export const POST_SUCCESS = 'student/planPaymentUpdateStatusPost/POST_SUCCESS';
export const POST_FAIL = 'student/planPaymentUpdateStatusPost/POST_FAIL';
export const FORM_RESET = 'student/planPaymentUpdateStatusPost/FORM_RESET';

// Action objects
export const studentPlanPaymentUpdateStatusPostStart = createAction(POST_START);
export const studentPlanPaymentUpdateStatusPostSuccess = createAction(POST_SUCCESS);
export const studentPlanPaymentUpdateStatusPostFail = createAction(POST_FAIL);
export const studentPlanPaymentUpdateStatusPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanPaymentUpdateStatusPost(formData) {
  return dispatch => {
    dispatch(studentPlanPaymentUpdateStatusPostStart());

    updateStudentPlanPaymentUpdateStatus(formData)
      .done(id => {
        dispatch(studentPlanPaymentUpdateStatusPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanPaymentUpdateStatusPostFail(error));
      });
  };
}
