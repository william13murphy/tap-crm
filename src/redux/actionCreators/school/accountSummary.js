import { createAction } from 'redux-actions';
import { postSchoolAccountSummary } from 'api';

// Action type constants
export const FETCH_START = 'school/accountSummary/FETCH_START';
export const FETCH_SUCCESS = 'school/accountSummary/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/accountSummary/FETCH_FAIL';
export const RESET_STATE = 'school/accountSummary/RESET_STATE';

// Action objects
export const schoolAccountSummaryFetchStart = createAction(FETCH_START);
export const schoolAccountSummaryFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolAccountSummaryFetchFail = createAction(FETCH_FAIL);
export const schoolAccountSummaryResetState = createAction(RESET_STATE);

export function schoolAccountSummaryFetch(formData) {
  return dispatch => {
    dispatch(schoolAccountSummaryFetchStart());

    postSchoolAccountSummary(formData)
      .done(schoolAccountSummary => {
        dispatch(schoolAccountSummaryFetchSuccess(schoolAccountSummary));
      })
      .fail(error => {
        dispatch(schoolAccountSummaryFetchFail(error));
      });
  };
}
