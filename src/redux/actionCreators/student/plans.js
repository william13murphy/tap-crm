import { createAction } from 'redux-actions';
import { getStudentPlans } from 'api';

// Action type constants
export const FETCH_START = 'student/plans/FETCH_START';
export const FETCH_SUCCESS = 'student/plans/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/plans/FETCH_FAIL';
export const RESET_STATE = 'student/plans/RESET_STATE';

// Action objects
export const studentPlansFetchStart = createAction(FETCH_START);
export const studentPlansFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlansFetchFail = createAction(FETCH_FAIL);
export const studentPlansResetState = createAction(RESET_STATE);

export function studentPlansFetch(id: string) {
  return dispatch => {
    dispatch(studentPlansFetchStart());

    getStudentPlans((id: string))
      .done(studentPlans => {
        dispatch(studentPlansFetchSuccess(studentPlans));
      })
      .fail(error => {
        dispatch(studentPlansFetchFail(error));
      });
  };
}
