import { createAction } from 'redux-actions';
import { saveStudentPlanStudentStyleRate } from 'api';

// Action type constants
export const POST_START = 'student/planStudentStyleRatePost/POST_START';
export const POST_SUCCESS = 'student/planStudentStyleRatePost/POST_SUCCESS';
export const POST_FAIL = 'student/planStudentStyleRatePost/POST_FAIL';
export const FORM_RESET = 'student/planStudentStyleRatePost/FORM_RESET';

// Action objects
export const studentPlanStudentStyleRatePostStart = createAction(POST_START);
export const studentPlanStudentStyleRatePostSuccess = createAction(
  POST_SUCCESS
);
export const studentPlanStudentStyleRatePostFail = createAction(POST_FAIL);
export const studentPlanStudentStyleRatePostFormReset = createAction(
  FORM_RESET
);

// Thunk action objects
export function studentPlanStudentStyleRatePost(formData) {
  return dispatch => {
    dispatch(studentPlanStudentStyleRatePostStart());

    saveStudentPlanStudentStyleRate(formData)
      .done(id => {
        dispatch(studentPlanStudentStyleRatePostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanStudentStyleRatePostFail(error));
      });
  };
}
