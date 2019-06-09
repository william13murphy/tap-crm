import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'pos/customer/FETCH_START';
export const FETCH_SUCCESS = 'pos/customer/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/customer/FETCH_FAIL';
export const RESET_STATE = 'pos/customer/RESET_STATE';

// Action objects
export const customerFetchStart = createAction(FETCH_START);
export const customerFetchSuccess = createAction(FETCH_SUCCESS);
export const customerFetchFail = createAction(FETCH_FAIL);
export const customerResetState = createAction(RESET_STATE);

export function customerUpdate(payload) {
  return dispatch => {
    dispatch(customerFetchSuccess(payload));
  };
}

export function customerReset() {
  return dispatch => {
    dispatch(customerResetState());
  };
}
