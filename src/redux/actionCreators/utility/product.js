import { createAction } from 'redux-actions';
import { getProduct } from 'api';

// Action type constants
export const FETCH_START = 'utility/product/FETCH_START';
export const FETCH_SUCCESS = 'utility/product/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/product/FETCH_FAIL';
export const RESET_STATE = 'utility/product/RESET_STATE';

// Action objects
export const productFetchStart = createAction(FETCH_START);
export const productFetchSuccess = createAction(FETCH_SUCCESS);
export const productFetchFail = createAction(FETCH_FAIL);
export const productResetState = createAction(RESET_STATE);

export function productFetch(id) {
  return dispatch => {
    dispatch(productFetchStart());

    getProduct(id)
      .done(payload => {
        dispatch(productFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(productFetchFail(error));
      });
  };
}

export function productReset() {
  return dispatch => {
    dispatch(productResetState());
  };
}
