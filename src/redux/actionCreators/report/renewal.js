import { createAction } from 'redux-actions';
import { getRenewal } from 'api';

// Action type constants
export const FETCH_START = 'report/renewal/FETCH_START';
export const FETCH_SUCCESS = 'report/renewal/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/renewal/FETCH_FAIL';
export const RESET_STATE = 'report/renewal/RESET_STATE';

// Action objects
export const renewalFetchStart = createAction(FETCH_START);
export const renewalFetchSuccess = createAction(FETCH_SUCCESS);
export const renewalFetchFail = createAction(FETCH_FAIL);
export const renewalResetState = createAction(RESET_STATE);

export function renewalFetch(schoolId: string) {
  return dispatch => {
    dispatch(renewalFetchStart());

    getRenewal((schoolId: string))
      .done(payload => {
        dispatch(renewalFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(renewalFetchFail(error));
      });
  };
}
