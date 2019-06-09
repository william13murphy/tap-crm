import { createAction } from 'redux-actions';
import { getStudentRankRequirementsByStyle } from 'api';

// Action type constants
export const FETCH_START = 'student/rankRequirementsByStyle/FETCH_START';
export const FETCH_SUCCESS = 'student/rankRequirementsByStyle/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/rankRequirementsByStyle/FETCH_FAIL';
export const RESET_STATE = 'student/rankRequirementsByStyle/RESET_STATE';

// Action objects
export const studentRankRequirementsByStyleFetchStart = createAction(
  FETCH_START
);
export const studentRankRequirementsByStyleFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentRankRequirementsByStyleFetchFail = createAction(FETCH_FAIL);
export const studentRankRequirementsByStyleResetState = createAction(
  RESET_STATE
);

export function studentRankRequirementsByStyleFetch(data) {
  return dispatch => {
    dispatch(studentRankRequirementsByStyleFetchStart());

    getStudentRankRequirementsByStyle(data)
      .done(payload => {
        dispatch(studentRankRequirementsByStyleFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentRankRequirementsByStyleFetchFail(error));
      });
  };
}
