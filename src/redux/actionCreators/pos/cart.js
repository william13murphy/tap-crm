import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'pos/cart/FETCH_START';
export const FETCH_SUCCESS = 'pos/cart/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/cart/FETCH_FAIL';
export const RESET_STATE = 'pos/cart/RESET_STATE';

// Action objects
export const cartFetchStart = createAction(FETCH_START);
export const cartFetchSuccess = createAction(FETCH_SUCCESS);
export const cartFetchFail = createAction(FETCH_FAIL);
export const cartResetState = createAction(RESET_STATE);

export function cartUpdate(payload) {
  return dispatch => {
    dispatch(cartFetchSuccess(payload));
  };
}

export function cartReset() {
  return dispatch => {
    dispatch(cartResetState());
  };
}
