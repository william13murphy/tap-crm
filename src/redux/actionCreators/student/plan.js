import { createAction } from 'redux-actions';
import { getStudentPlan } from 'api';

// Action type constants
export const FETCH_START = 'student/plans/FETCH_START';
export const FETCH_SUCCESS = 'student/plans/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/plans/FETCH_FAIL';
export const RESET_STATE = 'student/plans/RESET_STATE';

// Action objects
export const studentPlanFetchStart = createAction(FETCH_START);
export const studentPlanFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanFetchFail = createAction(FETCH_FAIL);
export const studentPlanResetState = createAction(RESET_STATE);

export function studentPlanFetch(id: string) {
  return dispatch => {
    dispatch(studentPlanFetchStart());

    getStudentPlan((id: string))
      .done(studentPlan => {
        dispatch(studentPlanFetchSuccess(studentPlan));
      })
      .fail(error => {
        dispatch(studentPlanFetchFail(error));
      });
  };
}
