import { createAction } from 'redux-actions';
import { saveStudentPlanDiscount } from 'api';

// Action type constants
export const POST_START = 'student/planDiscountPost/POST_START';
export const POST_SUCCESS = 'student/planDiscountPost/POST_SUCCESS';
export const POST_FAIL = 'student/planDiscountPost/POST_FAIL';
export const FORM_RESET = 'student/planDiscountPost/FORM_RESET';

// Action objects
export const studentPlanDiscountPostStart = createAction(POST_START);
export const studentPlanDiscountPostSuccess = createAction(POST_SUCCESS);
export const studentPlanDiscountPostFail = createAction(POST_FAIL);
export const studentPlanDiscountPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanDiscountPost(formData) {
  return dispatch => {
    dispatch(studentPlanDiscountPostStart());

    saveStudentPlanDiscount(formData)
      .done(() => {
        dispatch(studentPlanDiscountPostSuccess());
      })
      .fail(error => {
        dispatch(studentPlanDiscountPostFail(error));
      });
  };
}
