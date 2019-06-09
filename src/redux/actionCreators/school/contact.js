import { createAction } from 'redux-actions';
import { getSchoolContact } from 'api';

// Action type constants
export const FETCH_START = 'school/contact/FETCH_START';
export const FETCH_SUCCESS = 'school/contact/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/contact/FETCH_FAIL';
export const RESET_STATE = 'school/contact/RESET_STATE';

// Action objects
export const schoolContactFetchStart = createAction(FETCH_START);
export const schoolContactFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolContactFetchFail = createAction(FETCH_FAIL);
export const schoolContactResetState = createAction(RESET_STATE);

export function schoolContactFetch(id: string) {
  return dispatch => {
    dispatch(schoolContactFetchStart());

    getSchoolContact((id: string))
      .done(schoolContact => {
        dispatch(schoolContactFetchSuccess(schoolContact));
      })
      .fail(error => {
        dispatch(schoolContactFetchFail(error));
      });
  };
}
