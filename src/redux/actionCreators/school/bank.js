import { createAction } from 'redux-actions';
import { getSchoolBank } from 'api';

// Action type constants
export const FETCH_START = 'school/bank/FETCH_START';
export const FETCH_SUCCESS = 'school/bank/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/bank/FETCH_FAIL';
export const RESET_STATE = 'school/bank/RESET_STATE';

// Action objects
export const schoolBankFetchStart = createAction(FETCH_START);
export const schoolBankFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolBankFetchFail = createAction(FETCH_FAIL);
export const schoolBankResetState = createAction(RESET_STATE);

export function schoolBankFetch(id: string) {
  return dispatch => {
    dispatch(schoolBankFetchStart());

    getSchoolBank((id: string))
      .done(schoolbank => {
        dispatch(schoolBankFetchSuccess(schoolbank));
      })
      .fail(error => {
        dispatch(schoolBankFetchFail(error));
      });
  };
}
