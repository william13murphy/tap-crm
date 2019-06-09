import { createAction } from 'redux-actions';
import { getEfcStudentUnpaidByUserId } from 'api';

// Action type constants
export const FETCH_START = 'report/efcStudentUnpaidByUserId/FETCH_START';
export const FETCH_SUCCESS = 'report/efcStudentUnpaidByUserId/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/efcStudentUnpaidByUserId/FETCH_FAIL';
export const RESET_STATE = 'report/efcStudentUnpaidByUserId/RESET_STATE';

// Action objects
export const efcStudentUnpaidByUserIdFetchStart = createAction(FETCH_START);
export const efcStudentUnpaidByUserIdFetchSuccess = createAction(FETCH_SUCCESS);
export const efcStudentUnpaidByUserIdFetchFail = createAction(FETCH_FAIL);
export const efcStudentUnpaidByUserIdResetState = createAction(RESET_STATE);

export function efcStudentUnpaidByUserIdFetch(schoolId: string) {
  return dispatch => {
    dispatch(efcStudentUnpaidByUserIdFetchStart());

    getEfcStudentUnpaidByUserId((schoolId: string))
      .done(payload => {
        dispatch(efcStudentUnpaidByUserIdFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(efcStudentUnpaidByUserIdFetchFail(error));
      });
  };
}
