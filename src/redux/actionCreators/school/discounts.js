import { createAction } from 'redux-actions';
import { getSchoolDiscounts } from 'api';

// Action type constants
export const FETCH_START = 'school/discounts/FETCH_START';
export const FETCH_SUCCESS = 'school/discounts/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/discounts/FETCH_FAIL';
export const RESET_STATE = 'school/discounts/RESET_STATE';

// Action objects
export const schoolDiscountsFetchStart = createAction(FETCH_START);
export const schoolDiscountsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolDiscountsFetchFail = createAction(FETCH_FAIL);
export const schoolDiscountsResetState = createAction(RESET_STATE);

export function schoolDiscountsFetch(id: string) {
  return dispatch => {
    dispatch(schoolDiscountsFetchStart());
    getSchoolDiscounts((id: string))
      .done(schoolDiscounts => {
        dispatch(schoolDiscountsFetchSuccess(schoolDiscounts));
      })
      .fail(error => {
        dispatch(schoolDiscountsFetchFail(error));
      });
  };
}
