import { createAction } from 'redux-actions';
import { getStudentSchool } from 'api';

// Action type constants
export const FETCH_START = 'student/school/FETCH_START';
export const FETCH_SUCCESS = 'student/school/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/school/FETCH_FAIL';
export const RESET_STATE = 'student/school/RESET_STATE';

// Action objects
export const schoolFetchStart = createAction(FETCH_START);
export const schoolFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolFetchFail = createAction(FETCH_FAIL);
export const schoolResetState = createAction(RESET_STATE);

export function schoolFetch(id) {
  return dispatch => {
    dispatch(schoolFetchStart());

    getStudentSchool(id)
      .done(school => {
        dispatch(schoolFetchSuccess(school));
      })
      .fail(error => {
        dispatch(schoolFetchFail(error));
      });
  };
}
