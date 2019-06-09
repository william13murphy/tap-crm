import { createAction } from 'redux-actions';
import { postSchoolRankRequirement } from 'api';

// Action type constants
export const POST_START = 'school/rankRequirementPost/POST_START';
export const POST_SUCCESS = 'school/rankRequirementPost/POST_SUCCESS';
export const POST_FAIL = 'school/rankRequirementPost/POST_FAIL';
export const FORM_RESET = 'school/rankRequirementPost/FORM_RESET';

// Action objects
export const schoolRankRequirementPostStart = createAction(POST_START);
export const schoolRankRequirementPostSuccess = createAction(POST_SUCCESS);
export const schoolRankRequirementPostFail = createAction(POST_FAIL);
export const schoolRankRequirementPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolRankRequirementPost(formData) {
  return dispatch => {
    dispatch(schoolRankRequirementPostStart());

    postSchoolRankRequirement(formData)
      .done(() => {
        dispatch(schoolRankRequirementPostSuccess());
      })
      .fail(error => {
        dispatch(schoolRankRequirementPostFail(error));
      });
  };
}
