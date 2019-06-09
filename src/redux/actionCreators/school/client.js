import { createAction } from 'redux-actions';
import { getSchoolClient } from 'api';

// Action type constants
export const FETCH_START = 'school/client/FETCH_START';
export const FETCH_SUCCESS = 'school/client/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/client/FETCH_FAIL';
export const RESET_STATE = 'school/client/RESET_STATE';

// Action objects
export const schoolClientFetchStart = createAction(FETCH_START);
export const schoolClientFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolClientFetchFail = createAction(FETCH_FAIL);
export const schoolClientResetState = createAction(RESET_STATE);

export function schoolClientFetch(id: string) {
  return dispatch => {
    dispatch(schoolClientFetchStart());

    getSchoolClient((id: string))
      .done(schoolClient => {
        dispatch(schoolClientFetchSuccess(schoolClient));
      })
      .fail(error => {
        dispatch(schoolClientFetchFail(error));
      });
  };
}
