import { createAction } from 'redux-actions';
import { getStudentStyleRankProgressions } from 'api';

// Action type constants
export const FETCH_START = 'student/progressions/FETCH_START';
export const FETCH_SUCCESS = 'student/progressions/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/progressions/FETCH_FAIL';
export const RESET_STATE = 'student/progressions/RESET_STATE';

// Action objects
export const studentProgressionsFetchStart = createAction(FETCH_START);
export const studentProgressionsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentProgressionsFetchFail = createAction(FETCH_FAIL);
export const studentProgressionsResetState = createAction(RESET_STATE);

export function studentProgressionsFetch(id: string) {
  return dispatch => {
    dispatch(studentProgressionsFetchStart());

    getStudentStyleRankProgressions((id: string))
      .done(payload => {
        dispatch(studentProgressionsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentProgressionsFetchFail(error));
      });
  };
}
