import { createAction } from 'redux-actions';
import { getStudentStyleRankProgressionsByStyle } from 'api';

// Action type constants
export const FETCH_START = 'student/progressionsByStyle/FETCH_START';
export const FETCH_SUCCESS = 'student/progressionsByStyle/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/progressionsByStyle/FETCH_FAIL';
export const RESET_STATE = 'student/progressionsByStyle/RESET_STATE';

// Action objects
export const studentProgressionsByStyleFetchStart = createAction(FETCH_START);
export const studentProgressionsByStyleFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const studentProgressionsByStyleFetchFail = createAction(FETCH_FAIL);
export const studentProgressionsByStyleResetState = createAction(RESET_STATE);

export function studentProgressionsByStyleFetch(params: {
  studentId: string,
  schoolId: string,
  schoolStyleId: string,
}) {
  return dispatch => {
    dispatch(studentProgressionsByStyleFetchStart());

    getStudentStyleRankProgressionsByStyle((params: string))
      .done(payload => {
        dispatch(studentProgressionsByStyleFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentProgressionsByStyleFetchFail(error));
      });
  };
}
