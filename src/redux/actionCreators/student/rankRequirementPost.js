import { createAction } from 'redux-actions';
import { saveStudentRankRequirement } from 'api';

// Action type constants
export const POST_START = 'student/rankRequirementPost/POST_START';
export const POST_SUCCESS = 'student/rankRequirementPost/POST_SUCCESS';
export const POST_FAIL = 'student/rankRequirementPost/POST_FAIL';
export const FORM_RESET = 'student/rankRequirementPost/FORM_RESET';

// Action objects
export const studentRankRequirementPostStart = createAction(POST_START);
export const studentRankRequirementPostSuccess = createAction(POST_SUCCESS);
export const studentRankRequirementPostFail = createAction(POST_FAIL);
export const studentRankRequirementFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentRankRequirementPost(formData) {
  return dispatch => {
    dispatch(studentRankRequirementPostStart());

    saveStudentRankRequirement(formData)
      .done(payload => {
        dispatch(studentRankRequirementPostSuccess(payload));
      })
      .fail(error => {
        dispatch(studentRankRequirementPostFail(error));
      });
  };
}
