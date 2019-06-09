import { createAction } from 'redux-actions';
import { getStudentEnrollmentByProgram } from 'api';

// Action type constants
export const FETCH_START = 'report/enrollmentByProgram/FETCH_START';
export const FETCH_SUCCESS = 'report/enrollmentByProgram/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/enrollmentByProgram/FETCH_FAIL';
export const RESET_STATE = 'report/enrollmentByProgram/RESET_STATE';

// Action objects
export const enrollmentByProgramFetchStart = createAction(FETCH_START);
export const enrollmentByProgramFetchSuccess = createAction(FETCH_SUCCESS);
export const enrollmentByProgramFetchFail = createAction(FETCH_FAIL);
export const enrollmentByProgramResetState = createAction(RESET_STATE);

export function enrollmentByProgramFetch(id: string) {
  return dispatch => {
    dispatch(enrollmentByProgramFetchStart());

    getStudentEnrollmentByProgram((id: string))
      .done(payload => {
        dispatch(enrollmentByProgramFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(enrollmentByProgramFetchFail(error));
      });
  };
}
