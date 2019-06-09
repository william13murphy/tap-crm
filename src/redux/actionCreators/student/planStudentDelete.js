import { createAction } from 'redux-actions';
import { deleteStudentPlanStudent } from 'api';

// Action type constants
export const POST_START = 'student/planStudentDelete/POST_START';
export const POST_SUCCESS = 'student/planStudentDelete/POST_SUCCESS';
export const POST_FAIL = 'student/planStudentDelete/POST_FAIL';
export const FORM_RESET = 'student/planStudentDelete/FORM_RESET';

// Action objects
export const studentPlanStudentDeleteStart = createAction(POST_START);
export const studentPlanStudentDeleteSuccess = createAction(POST_SUCCESS);
export const studentPlanStudentDeleteFail = createAction(POST_FAIL);
export const studentPlanStudentDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentPlanStudentDelete(formData) {
  return dispatch => {
    dispatch(studentPlanStudentDeleteStart());

    deleteStudentPlanStudent(formData)
      .done(payload => {
        dispatch(studentPlanStudentDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentPlanStudentDeleteFail(error));
      });
  };
}
