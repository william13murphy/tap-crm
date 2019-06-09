import { createAction } from 'redux-actions';
import { getStudentPaymentHistory } from 'api';

// Action type constants
export const FETCH_START = 'report/studentPaymentHistory/FETCH_START';
export const FETCH_SUCCESS = 'report/studentPaymentHistory/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/studentPaymentHistory/FETCH_FAIL';
export const RESET_STATE = 'report/studentPaymentHistory/RESET_STATE';

// Action objects
export const studentPaymentHistoryFetchStart = createAction(FETCH_START);
export const studentPaymentHistoryFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPaymentHistoryFetchFail = createAction(FETCH_FAIL);
export const studentPaymentHistoryResetState = createAction(RESET_STATE);

export function studentPaymentHistoryFetch(id: string) {
  return dispatch => {
    dispatch(studentPaymentHistoryFetchStart());

    getStudentPaymentHistory((id: string))
      .done(payload => {
        dispatch(studentPaymentHistoryFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPaymentHistoryFetchFail(error));
      });
  };
}
