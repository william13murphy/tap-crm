import { createAction } from 'redux-actions';
import { getStudentUnpaid } from 'api';

// Action type constants
export const FETCH_START = 'report/studentUnpaid/FETCH_START';
export const FETCH_SUCCESS = 'report/studentUnpaid/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/studentUnpaid/FETCH_FAIL';
export const RESET_STATE = 'report/studentUnpaid/RESET_STATE';

// Action objects
export const studentUnpaidFetchStart = createAction(FETCH_START);
export const studentUnpaidFetchSuccess = createAction(FETCH_SUCCESS);
export const studentUnpaidFetchFail = createAction(FETCH_FAIL);
export const studentUnpaidResetState = createAction(RESET_STATE);

export function studentUnpaidFetch(schoolId: string) {
  return dispatch => {
    dispatch(studentUnpaidFetchStart());

    getStudentUnpaid((schoolId: string))
      .done(payload => {
        dispatch(studentUnpaidFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentUnpaidFetchFail(error));
      });
  };
}
