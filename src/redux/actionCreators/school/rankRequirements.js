import { createAction } from 'redux-actions';
import { getSchoolRankRequirements } from 'api';

// Action type constants
export const FETCH_START = 'school/rankRequirements/FETCH_START';
export const FETCH_SUCCESS = 'school/rankRequirements/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/rankRequirements/FETCH_FAIL';
export const RESET_STATE = 'school/rankRequirements/RESET_STATE';

// Action objects
export const schoolRankRequirementsFetchStart = createAction(FETCH_START);
export const schoolRankRequirementsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolRankRequirementsFetchFail = createAction(FETCH_FAIL);
export const schoolRankRequirementsResetState = createAction(RESET_STATE);

export function schoolRankRequirementsFetch(id: string) {
  return dispatch => {
    dispatch(schoolRankRequirementsFetchStart());

    getSchoolRankRequirements((id: string))
      .done(schoolRankRequirements => {
        dispatch(schoolRankRequirementsFetchSuccess(schoolRankRequirements));
      })
      .fail(error => {
        dispatch(schoolRankRequirementsFetchFail(error));
      });
  };
}
