import { createAction } from 'redux-actions';
import { getNewEnrollmentByProgram } from 'api';

// Action type constants
export const FETCH_START = 'report/newEnrollmentByProgram/FETCH_START';
export const FETCH_SUCCESS = 'report/newEnrollmentByProgram/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/newEnrollmentByProgram/FETCH_FAIL';
export const RESET_STATE = 'report/newEnrollmentByProgram/RESET_STATE';

// Action objects
export const newEnrollmentByProgramFetchStart = createAction(FETCH_START);
export const newEnrollmentByProgramFetchSuccess = createAction(FETCH_SUCCESS);
export const newEnrollmentByProgramFetchFail = createAction(FETCH_FAIL);
export const newEnrollmentByProgramResetState = createAction(RESET_STATE);

export function newEnrollmentByProgramFetch(id: string) {
  return dispatch => {
    dispatch(newEnrollmentByProgramFetchStart());

    getNewEnrollmentByProgram((id: string))
      .done(payload => {
        dispatch(newEnrollmentByProgramFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(newEnrollmentByProgramFetchFail(error));
      });
  };
}
