import { createAction } from 'redux-actions';
import { getStudentPurchaseHistory } from 'api';

// Action type constants
export const FETCH_START = 'pos/studentPurchaseHistory/FETCH_START';
export const FETCH_SUCCESS = 'pos/studentPurchaseHistory/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/studentPurchaseHistory/FETCH_FAIL';
export const RESET_STATE = 'pos/studentPurchaseHistory/RESET_STATE';

// Action objects
export const studentPurchaseHistoryFetchStart = createAction(FETCH_START);
export const studentPurchaseHistoryFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPurchaseHistoryFetchFail = createAction(FETCH_FAIL);
export const studentPurchaseHistoryResetState = createAction(RESET_STATE);

export function studentPurchaseHistoryFetch(id) {
  return dispatch => {
    dispatch(studentPurchaseHistoryFetchStart());

    getStudentPurchaseHistory(id)
      .done(payload => {
        dispatch(studentPurchaseHistoryFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPurchaseHistoryFetchFail(error));
      });
  };
}
