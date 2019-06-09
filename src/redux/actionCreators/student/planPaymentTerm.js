import { getStudentPlan } from 'api';
import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'student/planPaymentTerm/FETCH_START';
export const FETCH_SUCCESS = 'student/planPaymentTerm/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planPaymentTerm/FETCH_FAIL';
export const RESET_STATE = 'student/planPaymentTerm/RESET_STATE';

// Action objects
export const studentPlanPaymentTermFetchStart = createAction(FETCH_START);
export const studentPlanPaymentTermFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanPaymentTermFetchFail = createAction(FETCH_FAIL);
export const studentPlanPaymentTermResetState = createAction(RESET_STATE);

export function studentPlanPaymentTermFetch(id: string) {
  return dispatch => {
    dispatch(studentPlanPaymentTermFetchStart());

    getStudentPlan((id: string))
      .done(studentPlanPaymentTerm => {
        dispatch(studentPlanPaymentTermFetchSuccess(studentPlanPaymentTerm));
      })
      .fail(error => {
        dispatch(studentPlanPaymentTermFetchFail(error));
      });
  };
}
