import { createAction } from 'redux-actions';
import { getStudentPlanPayments } from 'api';

// Action type constants
export const FETCH_START = 'student/planPayments/FETCH_START';
export const FETCH_SUCCESS = 'student/planPayments/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planPayments/FETCH_FAIL';
export const RESET_STATE = 'student/planPayments/RESET_STATE';

// Action objects
export const studentPlanPaymentsFetchStart = createAction(FETCH_START);
export const studentPlanPaymentsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanPaymentsFetchFail = createAction(FETCH_FAIL);
export const studentPlanPaymentsResetState = createAction(RESET_STATE);

export function studentPlanPaymentsFetch(id: string) {
  return dispatch => {
    dispatch(studentPlanPaymentsFetchStart());

    getStudentPlanPayments((id: string))
      .done(planPayments => {
        dispatch(studentPlanPaymentsFetchSuccess(planPayments));
      })
      .fail(error => {
        dispatch(studentPlanPaymentsFetchFail(error));
      });
  };
}
