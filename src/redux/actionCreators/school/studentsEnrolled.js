import { createAction } from 'redux-actions';
import { getSchoolClassStudentsEnrolled } from 'api';

// Action type constants
export const FETCH_START = 'school/studentsEnrolled/FETCH_START';
export const FETCH_SUCCESS = 'school/studentsEnrolled/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/studentsEnrolled/FETCH_FAIL';
export const RESET_STATE = 'school/studentsEnrolled/RESET_STATE';

// Action objects
export const enrolledFetchStart = createAction(FETCH_START);
export const enrolledFetchSuccess = createAction(FETCH_SUCCESS);
export const enrolledFetchFail = createAction(FETCH_FAIL);
export const enrolledResetState = createAction(RESET_STATE);

export function schoolClassStudentsEnrolledFetch(Id) {
  return dispatch => {
    dispatch(enrolledFetchStart());

    getSchoolClassStudentsEnrolled(Id)
      .done(payload => {
        dispatch(enrolledFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(enrolledFetchFail(error));
      });
  };
}
