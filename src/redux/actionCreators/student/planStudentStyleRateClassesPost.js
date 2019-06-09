import { createAction } from 'redux-actions';
import { saveStudentPlanStudentStyleRateClasses } from 'api';

// Action type constants
export const POST_START = 'student/planStudentStyleRateClassesPost/POST_START';
export const POST_SUCCESS =
  'student/planStudentStyleRateClassesPost/POST_SUCCESS';
export const POST_FAIL = 'student/planStudentStyleRateClassesPost/POST_FAIL';
export const FORM_RESET = 'student/planStudentStyleRateClassesPost/FORM_RESET';

// Action objects
export const studentPlanStudentStyleRateClassesPostStart = createAction(
  POST_START
);
export const studentPlanStudentStyleRateClassesPostSuccess = createAction(
  POST_SUCCESS
);
export const studentPlanStudentStyleRateClassesPostFail = createAction(
  POST_FAIL
);
export const studentPlanStudentStyleRateClassesPostFormReset = createAction(
  FORM_RESET
);

// Thunk action objects
export function studentPlanStudentStyleRateClassesPost(formData) {
  return dispatch => {
    dispatch(studentPlanStudentStyleRateClassesPostStart());

    saveStudentPlanStudentStyleRateClasses(formData)
      .done(id => {
        dispatch(studentPlanStudentStyleRateClassesPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanStudentStyleRateClassesPostFail(error));
      });
  };
}
