import { createAction } from 'redux-actions';
import { saveStudentEmailPlanSummary } from 'api';

// Action type constants
export const POST_START = 'student/emailPlanSummaryPost/POST_START';
export const POST_SUCCESS = 'student/emailPlanSummaryPost/POST_SUCCESS';
export const POST_FAIL = 'student/emailPlanSummaryPost/POST_FAIL';
export const FORM_RESET = 'student/emailPlanSummaryPost/FORM_RESET';

// Action objects
export const studentEmailPlanSummaryPostStart = createAction(POST_START);
export const studentEmailPlanSummaryPostSuccess = createAction(POST_SUCCESS);
export const studentEmailPlanSummaryPostFail = createAction(POST_FAIL);
export const studentEmailPlanSummaryPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentEmailPlanSummaryPost(formData) {
  return dispatch => {
    dispatch(studentEmailPlanSummaryPostStart());

    saveStudentEmailPlanSummary(formData)
      .done(() => {
        dispatch(studentEmailPlanSummaryPostSuccess());
      })
      .fail(error => {
        dispatch(studentEmailPlanSummaryPostFail(error));
      });
  };
}
