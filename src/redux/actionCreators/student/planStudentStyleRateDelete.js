import { createAction } from 'redux-actions';
import { deleteStudentPlanStudentStyleRate } from 'api';

// Action type constants
export const POST_START = 'student/planStudentStyleRateDelete/POST_START';
export const POST_SUCCESS = 'student/planStudentStyleRateDelete/POST_SUCCESS';
export const POST_FAIL = 'student/planStudentStyleRateDelete/POST_FAIL';
export const FORM_RESET = 'student/planStudentStyleRateDelete/FORM_RESET';

// Action objects
export const studentPlanStudentStyleRateDeleteStart = createAction(POST_START);
export const studentPlanStudentStyleRateDeleteSuccess = createAction(
  POST_SUCCESS
);
export const studentPlanStudentStyleRateDeleteFail = createAction(POST_FAIL);
export const studentPlanStudentStyleRateDeleteFormReset = createAction(
  FORM_RESET
);

// Thunk action objects
export function studentPlanStudentStyleRateDelete(styleRateId) {
  return dispatch => {
    dispatch(studentPlanStudentStyleRateDeleteStart());

    deleteStudentPlanStudentStyleRate(styleRateId)
      .done(id => {
        dispatch(studentPlanStudentStyleRateDeleteSuccess(id));
      })
      .fail(error => {
        dispatch(studentPlanStudentStyleRateDeleteFail(error));
      });
  };
}
