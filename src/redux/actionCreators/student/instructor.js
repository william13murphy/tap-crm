import { createAction } from 'redux-actions';
import { getStudentInstructor } from 'api';

// Action type constants
export const FETCH_START = 'student/instructor/FETCH_START';
export const FETCH_SUCCESS = 'student/instructor/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/instructor/FETCH_FAIL';
export const RESET_STATE = 'student/instructor/RESET_STATE';

// Action objects
export const instructorFetchStart = createAction(FETCH_START);
export const instructorFetchSuccess = createAction(FETCH_SUCCESS);
export const instructorFetchFail = createAction(FETCH_FAIL);
export const instructorResetState = createAction(RESET_STATE);

export function instructorFetch(id) {
  return dispatch => {
    dispatch(instructorFetchStart());

    getStudentInstructor(id)
      .done(instructor => {
        dispatch(instructorFetchSuccess(instructor));
      })
      .fail(error => {
        dispatch(instructorFetchFail(error));
      });
  };
}
