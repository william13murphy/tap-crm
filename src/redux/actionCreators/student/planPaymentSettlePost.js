import { createAction } from 'redux-actions';
import { updateStudentPlanPaymentSettle } from 'api';

// Action type constants
export const POST_START = 'student/planPaymentSettlePost/POST_START';
export const POST_SUCCESS = 'student/planPaymentSettlePost/POST_SUCCESS';
export const POST_FAIL = 'student/planPaymentSettlePost/POST_FAIL';
export const FORM_RESET = 'student/planPaymentSettlePost/FORM_RESET';

// Action objects
export const studentPlanPaymentSettlePostStart = createAction(POST_START);
export const studentPlanPaymentSettlePostSuccess = createAction(POST_SUCCESS);
export const studentPlanPaymentSettlePostFail = createAction(POST_FAIL);
export const studentPlanPaymentSettlePostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanPaymentSettlePost(formData) {
  return dispatch => {
    dispatch(studentPlanPaymentSettlePostStart());

    updateStudentPlanPaymentSettle(formData)
      .done(id => {
        dispatch(studentPlanPaymentSettlePostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanPaymentSettlePostFail(error));
      });
  };
}
