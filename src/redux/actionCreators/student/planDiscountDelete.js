import { createAction } from 'redux-actions';
import { deleteStudentPlanDiscount } from 'api';

// Action type constants
export const POST_START = 'student/planDiscountDelete/POST_START';
export const POST_SUCCESS = 'student/planDiscountDelete/POST_SUCCESS';
export const POST_FAIL = 'student/planDiscountDelete/POST_FAIL';
export const FORM_RESET = 'student/planDiscountDelete/FORM_RESET';

// Action objects
export const studentPlanDiscountDeleteStart = createAction(POST_START);
export const studentPlanDiscountDeleteSuccess = createAction(POST_SUCCESS);
export const studentPlanDiscountDeleteFail = createAction(POST_FAIL);
export const studentPlanDiscountDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanDiscountDelete(formData) {
  return dispatch => {
    dispatch(studentPlanDiscountDeleteStart());

    deleteStudentPlanDiscount(formData)
      .done(payload => {
        dispatch(studentPlanDiscountDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPlanDiscountDeleteFail(error));
      });
  };
}
