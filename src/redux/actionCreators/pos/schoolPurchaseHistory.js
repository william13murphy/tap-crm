import { createAction } from 'redux-actions';
import { getSchoolPurchaseHistory } from 'api';

// Action type constants
export const FETCH_START = 'pos/schoolPurchaseHistory/FETCH_START';
export const FETCH_SUCCESS = 'pos/schoolPurchaseHistory/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/schoolPurchaseHistory/FETCH_FAIL';
export const RESET_STATE = 'pos/schoolPurchaseHistory/RESET_STATE';

// Action objects
export const schoolPurchaseHistoryFetchStart = createAction(FETCH_START);
export const schoolPurchaseHistoryFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolPurchaseHistoryFetchFail = createAction(FETCH_FAIL);
export const schoolPurchaseHistoryResetState = createAction(RESET_STATE);

export function schoolPurchaseHistoryFetch(id) {
  return dispatch => {
    dispatch(schoolPurchaseHistoryFetchStart());

    getSchoolPurchaseHistory(id)
      .done(payload => {
        dispatch(schoolPurchaseHistoryFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolPurchaseHistoryFetchFail(error));
      });
  };
}
