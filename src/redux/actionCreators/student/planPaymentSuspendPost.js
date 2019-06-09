import { createAction } from 'redux-actions';
import { updateStudentPlanPaymentSuspend } from 'api';

// Action type constants
export const POST_START = 'student/planPaymentSuspendPost/POST_START';
export const POST_SUCCESS = 'student/planPaymentSuspendPost/POST_SUCCESS';
export const POST_FAIL = 'student/planPaymentSuspendPost/POST_FAIL';
export const FORM_RESET = 'student/planPaymentSuspendPost/FORM_RESET';

// Action objects
export const studentPlanPaymentSuspendPostStart = createAction(POST_START);
export const studentPlanPaymentSuspendPostSuccess = createAction(POST_SUCCESS);
export const studentPlanPaymentSuspendPostFail = createAction(POST_FAIL);
export const studentPlanPaymentSuspendPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanPaymentSuspendPost(formData) {
  return dispatch => {
    dispatch(studentPlanPaymentSuspendPostStart());

    updateStudentPlanPaymentSuspend(formData)
      .done(id => {
        dispatch(studentPlanPaymentSuspendPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanPaymentSuspendPostFail(error));
      });
  };
}
