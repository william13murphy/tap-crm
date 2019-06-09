import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'pos/orderSummary/FETCH_START';
export const FETCH_SUCCESS = 'pos/orderSummary/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/orderSummary/FETCH_FAIL';
export const RESET_STATE = 'pos/orderSummary/RESET_STATE';

// Action objects
export const orderSummaryFetchStart = createAction(FETCH_START);
export const orderSummaryFetchSuccess = createAction(FETCH_SUCCESS);
export const orderSummaryFetchFail = createAction(FETCH_FAIL);
export const orderSummaryResetState = createAction(RESET_STATE);

export function orderSummary(payload) {
  return dispatch => {
    dispatch(orderSummaryFetchSuccess(payload));
  };
}

export function orderSummaryReset() {
  return dispatch => {
    dispatch(orderSummaryResetState());
  };
}
