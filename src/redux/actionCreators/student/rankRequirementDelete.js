import { createAction } from 'redux-actions';
import { deleteStudentRankRequirement } from 'api';

// Action type constants
export const POST_START = 'student/rankRequirementDelete/POST_START';
export const POST_SUCCESS = 'student/rankRequirementDelete/POST_SUCCESS';
export const POST_FAIL = 'student/rankRequirementDelete/POST_FAIL';
export const FORM_RESET = 'student/rankRequirementDelete/FORM_RESET';

// Action objects
export const studentRankRequirementDeleteStart = createAction(POST_START);
export const studentRankRequirementDeleteSuccess = createAction(POST_SUCCESS);
export const studentRankRequirementDeleteFail = createAction(POST_FAIL);
export const studentRankRequirementDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentRankRequirementDelete(formData) {
  return dispatch => {
    dispatch(studentRankRequirementDeleteStart());

    deleteStudentRankRequirement(formData)
      .done(payload => {
        dispatch(studentRankRequirementDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentRankRequirementDeleteFail(error));
      });
  };
}
