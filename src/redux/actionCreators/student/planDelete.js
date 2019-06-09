import { createAction } from 'redux-actions';
import { deleteStudentPlan } from 'api';

// Action type constants
export const POST_START = 'student/planDelete/POST_START';
export const POST_SUCCESS = 'student/planDelete/POST_SUCCESS';
export const POST_FAIL = 'student/planDelete/POST_FAIL';
export const FORM_RESET = 'student/planDelete/FORM_RESET';

// Action objects
export const planDeleteStart = createAction(POST_START);
export const planDeleteSuccess = createAction(POST_SUCCESS);
export const planDeleteFail = createAction(POST_FAIL);
export const planDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function planDelete(formData) {
  return dispatch => {
    dispatch(planDeleteStart());

    deleteStudentPlan(formData)
      .done(payload => {
        dispatch(planDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(planDeleteFail(error));
      });
  };
}
