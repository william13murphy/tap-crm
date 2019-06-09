import { createAction } from 'redux-actions';
import { getAllProducts } from 'api';

// Action type constants
export const FETCH_START = 'utility/allProducts/FETCH_START';
export const FETCH_SUCCESS = 'utility/allProducts/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/allProducts/FETCH_FAIL';
export const RESET_STATE = 'utility/allProducts/RESET_STATE';

// Action objects
export const allProductsFetchStart = createAction(FETCH_START);
export const allProductsFetchSuccess = createAction(FETCH_SUCCESS);
export const allProductsFetchFail = createAction(FETCH_FAIL);
export const allProductsResetState = createAction(RESET_STATE);

export function allProductsFetch() {
  return dispatch => {
    dispatch(allProductsFetchStart());

    getAllProducts()
      .done(payload => {
        dispatch(allProductsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allProductsFetchFail(error));
      });
  };
}
