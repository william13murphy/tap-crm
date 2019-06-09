import { createAction } from 'redux-actions';
import { deleteStudentPlanPaymentAccount } from 'api';

// Action type constants
export const POST_START = 'student/planPaymentAccountDelete/POST_START';
export const POST_SUCCESS = 'student/planPaymentAccountDelete/POST_SUCCESS';
export const POST_FAIL = 'student/planPaymentAccountDelete/POST_FAIL';
export const FORM_RESET = 'student/planPaymentAccountDelete/FORM_RESET';

// Action objects
export const studentPlanPaymentAccountDeleteStart = createAction(POST_START);
export const studentPlanPaymentAccountDeleteSuccess = createAction(
  POST_SUCCESS
);
export const studentPlanPaymentAccountDeleteFail = createAction(POST_FAIL);
export const studentPlanPaymentAccountDeleteFormReset = createAction(
  FORM_RESET
);

// Thunk action objects
export function studentPlanPaymentAccountDelete(formData) {
  return dispatch => {
    dispatch(studentPlanPaymentAccountDeleteStart());

    deleteStudentPlanPaymentAccount(formData)
      .done(payload => {
        dispatch(studentPlanPaymentAccountDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPlanPaymentAccountDeleteFail(error));
      });
  };
}
