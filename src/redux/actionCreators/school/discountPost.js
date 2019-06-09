import { createAction } from 'redux-actions';
import { saveSchoolDiscount } from 'api';

// Action type constants
export const POST_START = 'school/discountPost/POST_START';
export const POST_SUCCESS = 'school/discountPost/POST_SUCCESS';
export const POST_FAIL = 'school/discountPost/POST_FAIL';
export const FORM_RESET = 'school/discountPost/FORM_RESET';

// Action objects
export const schoolDiscountPostStart = createAction(POST_START);
export const schoolDiscountPostSuccess = createAction(POST_SUCCESS);
export const schoolDiscountPostFail = createAction(POST_FAIL);
export const schoolDiscountFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolDiscountPost(formData) {
  return dispatch => {
    dispatch(schoolDiscountPostStart());

    saveSchoolDiscount(formData)
      .done(() => {
        dispatch(schoolDiscountPostSuccess());
      })
      .fail(error => {
        dispatch(schoolDiscountPostFail(error));
      });
  };
}
