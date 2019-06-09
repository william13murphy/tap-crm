import { createAction } from 'redux-actions';
import { updateStudentPlan } from 'api';

// Action Type Constants
export const POST_START = 'student/planUpdate/POST_START';
export const POST_SUCCESS = 'student/planUpdate/POST_SUCCESS';
export const POST_FAIL = 'student/planUpdate/POST_FAIl';
export const FORM_RESET = 'student/planUpdate/FORM_RESET';

// Action Objects
export const studentplanUpdateStart = createAction(POST_START);
export const studentplanUpdateSuccess = createAction(POST_SUCCESS);
export const studentplanUpdateFail = createAction(POST_FAIL);
export const studentplanUpdateFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentplanUpdate(formData) {
  return dispatch => {
    dispatch(studentplanUpdateStart());

    updateStudentPlan(formData)
      .done(id => {
        dispatch(studentplanUpdateSuccess(id));
      })
      .fail(error => {
        dispatch(studentplanUpdateFail(error));
      });
  };
}
