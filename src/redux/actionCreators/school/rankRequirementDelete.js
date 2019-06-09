import { createAction } from 'redux-actions';
import { deleteSchoolRankRequirement } from 'api';

// Action type constants
export const POST_START = 'school/rankRequirementDelete/POST_START';
export const POST_SUCCESS = 'school/rankRequirementDelete/POST_SUCCESS';
export const POST_FAIL = 'school/rankRequirementDelete/POST_FAIL';
export const FORM_RESET = 'school/rankRequirementDelete/FORM_RESET';

// Action objects
export const schoolRankRequirementDeleteStart = createAction(POST_START);
export const schoolRankRequirementDeleteSuccess = createAction(POST_SUCCESS);
export const schoolRankRequirementDeleteFail = createAction(POST_FAIL);
export const schoolRankRequirementDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolRankRequirementDelete(formData) {
  return dispatch => {
    dispatch(schoolRankRequirementDeleteStart());

    deleteSchoolRankRequirement(formData)
      .done(payload => {
        dispatch(schoolRankRequirementDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolRankRequirementDeleteFail(error));
      });
  };
}
