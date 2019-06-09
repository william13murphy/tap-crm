import { createAction } from 'redux-actions';
import { postSchoolAccountStatement } from 'api';

// Action type constants
export const FETCH_START = 'school/accountStatement/FETCH_START';
export const FETCH_SUCCESS = 'school/accountStatement/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/accountStatement/FETCH_FAIL';
export const RESET_STATE = 'school/accountStatement/RESET_STATE';

// Action objects
export const schoolAccountStatementFetchStart = createAction(FETCH_START);
export const schoolAccountStatementFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolAccountStatementFetchFail = createAction(FETCH_FAIL);
export const schoolAccountStatementResetState = createAction(RESET_STATE);

export function schoolAccountStatementFetch(formData) {
  return dispatch => {
    dispatch(schoolAccountStatementFetchStart());

    postSchoolAccountStatement(formData)
      .done(schoolAccountStatement => {
        dispatch(schoolAccountStatementFetchSuccess(schoolAccountStatement));
      })
      .fail(error => {
        dispatch(schoolAccountStatementFetchFail(error));
      });
  };
}
