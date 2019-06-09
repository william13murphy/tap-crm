import { createAction } from 'redux-actions';
import { getEfcStudentUnpaid } from 'api';

// Action type constants
export const FETCH_START = 'report/efcStudentUnpaid/FETCH_START';
export const FETCH_SUCCESS = 'report/efcStudentUnpaid/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/efcStudentUnpaid/FETCH_FAIL';
export const RESET_STATE = 'report/efcStudentUnpaid/RESET_STATE';

// Action objects
export const efcStudentUnpaidFetchStart = createAction(FETCH_START);
export const efcStudentUnpaidFetchSuccess = createAction(FETCH_SUCCESS);
export const efcStudentUnpaidFetchFail = createAction(FETCH_FAIL);
export const efcStudentUnpaidResetState = createAction(RESET_STATE);

export function efcStudentUnpaidFetch(schoolId: string) {
  return dispatch => {
    dispatch(efcStudentUnpaidFetchStart());

    getEfcStudentUnpaid((schoolId: string))
      .done(payload => {
        dispatch(efcStudentUnpaidFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(efcStudentUnpaidFetchFail(error));
      });
  };
}
