import { createAction } from 'redux-actions';
import { putStudentPlanTerminate } from 'api';

// Action type constants
export const POST_START = 'student/planTerminatePost/POST_START';
export const POST_SUCCESS = 'student/planTerminatePost/POST_SUCCESS';
export const POST_FAIL = 'student/planTerminatePost/POST_FAIL';
export const FORM_RESET = 'student/planTerminatePost/FORM_RESET';

// Action objects
export const studentPlanTerminatePostStart = createAction(POST_START);
export const studentPlanTerminatePostSuccess = createAction(POST_SUCCESS);
export const studentPlanTerminatePostFail = createAction(POST_FAIL);
export const studentPlanTerminatePostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanTerminatePost(planId) {
  return dispatch => {
    dispatch(studentPlanTerminatePostStart());

    putStudentPlanTerminate(planId)
      .done(() => {
        dispatch(studentPlanTerminatePostSuccess());
      })
      .fail(error => {
        dispatch(studentPlanTerminatePostFail(error));
      });
  };
}
