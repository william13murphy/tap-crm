import { createAction } from 'redux-actions';
import { getSchoolProfile } from 'api';

// Action type constants
export const FETCH_START = 'school/profile/FETCH_START';
export const FETCH_SUCCESS = 'school/profile/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/profile/FETCH_FAIL';
export const RESET_STATE = 'school/profile/RESET_STATE';

// Action objects
export const schoolProfileFetchStart = createAction(FETCH_START);
export const schoolProfileFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolProfileFetchFail = createAction(FETCH_FAIL);
export const schoolProfileResetState = createAction(RESET_STATE);

export function schoolProfileFetch(id: string) {
  return dispatch => {
    dispatch(schoolProfileFetchStart());

    getSchoolProfile((id: string))
      .done(schoolProfile => {
        dispatch(schoolProfileFetchSuccess(schoolProfile));
      })
      .fail(error => {
        dispatch(schoolProfileFetchFail(error));
      });
  };
}
