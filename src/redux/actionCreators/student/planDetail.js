import { createAction } from 'redux-actions';
import { getStudentPlanDetail } from 'api';

// Action type constants
export const FETCH_START = 'student/planDetail/FETCH_START';
export const FETCH_SUCCESS = 'student/planDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planDetail/FETCH_FAIL';
export const RESET_STATE = 'student/planDetail/RESET_STATE';

// Action objects
export const studentPlanDetailFetchStart = createAction(FETCH_START);
export const studentPlanDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanDetailFetchFail = createAction(FETCH_FAIL);
export const studentPlanDetailResetState = createAction(RESET_STATE);

export function studentPlanDetailFetch(id) {
  return dispatch => {
    dispatch(studentPlanDetailFetchStart());

    getStudentPlanDetail(id)
      .done(studentPlanDetail => {
        dispatch(studentPlanDetailFetchSuccess(studentPlanDetail));
      })
      .fail(error => {
        dispatch(studentPlanDetailFetchFail(error));
      });
  };
}
