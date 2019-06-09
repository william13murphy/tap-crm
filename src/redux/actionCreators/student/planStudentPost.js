import { createAction } from 'redux-actions';
import { saveStudentPlanStudent } from 'api';

// Action type constants
export const POST_START = 'student/planStudentPost/POST_START';
export const POST_SUCCESS = 'student/planStudentPost/POST_SUCCESS';
export const POST_FAIL = 'student/planStudentPost/POST_FAIL';
export const FORM_RESET = 'student/planStudentPost/FORM_RESET';

// Action objects
export const studentPlanStudentPostStart = createAction(POST_START);
export const studentPlanStudentPostSuccess = createAction(POST_SUCCESS);
export const studentPlanStudentPostFail = createAction(POST_FAIL);
export const studentPlanStudentPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanStudentPost(formData) {
  return dispatch => {
    dispatch(studentPlanStudentPostStart());

    saveStudentPlanStudent(formData)
      .done(id => {
        dispatch(studentPlanStudentPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanStudentPostFail(error));
      });
  };
}
