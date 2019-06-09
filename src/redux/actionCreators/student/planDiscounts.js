import { createAction } from 'redux-actions';
import { getStudentPlanDiscounts } from 'api';

// Action type constants
export const FETCH_START = 'student/planDiscount/FETCH_START';
export const FETCH_SUCCESS = 'student/planDiscount/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planDiscount/FETCH_FAIL';
export const RESET_STATE = 'student/planDiscount/RESET_STATE';

// Action objects
export const studentPlanDiscountsFetchStart = createAction(FETCH_START);
export const studentPlanDiscountsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentPlanDiscountsFetchFail = createAction(FETCH_FAIL);
export const studentPlanDiscountsResetState = createAction(RESET_STATE);

export function studentPlanDiscountsFetch(id) {
  return dispatch => {
    dispatch(studentPlanDiscountsFetchStart());

    getStudentPlanDiscounts(id)
      .done(studentPlanDiscounts => {
        dispatch(studentPlanDiscountsFetchSuccess(studentPlanDiscounts));
      })
      .fail(error => {
        dispatch(studentPlanDiscountsFetchFail(error));
      });
  };
}
