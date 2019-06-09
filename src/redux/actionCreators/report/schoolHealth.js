import { createAction } from 'redux-actions';
import { postSchoolHealth } from 'api';

// Action type constants
export const FETCH_START = 'report/schoolHealth/FETCH_START';
export const FETCH_SUCCESS = 'report/schoolHealth/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/schoolHealth/FETCH_FAIL';
export const RESET_STATE = 'report/schoolHealth/RESET_STATE';

// Action objects
export const schoolHealthFetchStart = createAction(FETCH_START);
export const schoolHealthFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolHealthFetchFail = createAction(FETCH_FAIL);
export const schoolHealthResetState = createAction(RESET_STATE);

export function schoolHealthFetch(data: {}) {
  return dispatch => {
    dispatch(schoolHealthFetchStart());

    postSchoolHealth(data)
      .then(payload => {
        dispatch(schoolHealthFetchSuccess(payload));
      })
      .catch(error => {
        dispatch(schoolHealthFetchFail(error));
      });
  };
}
