import { createAction } from 'redux-actions';
import { getStudentStyleRankProgressionSummary } from 'api';

// Action type constants
export const FETCH_START = 'student/progressionSummary/FETCH_START';
export const FETCH_SUCCESS = 'student/progressionSummary/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/progressionSummary/FETCH_FAIL';
export const RESET_STATE = 'student/progressionSummary/RESET_STATE';

// Action objects
export const studentprogressionSummaryFetchStart = createAction(FETCH_START);
export const studentprogressionSummaryFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentprogressionSummaryFetchFail = createAction(FETCH_FAIL);
export const studentprogressionSummaryResetState = createAction(RESET_STATE);

export function studentprogressionSummaryFetch(id) {
  return dispatch => {
    dispatch(studentprogressionSummaryFetchStart());

    getStudentStyleRankProgressionSummary(id)
      .done(studentprogressionSummary => {
        dispatch(
          studentprogressionSummaryFetchSuccess(studentprogressionSummary)
        );
      })
      .fail(error => {
        dispatch(studentprogressionSummaryFetchFail(error));
      });
  };
}
