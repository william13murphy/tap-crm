import { createAction } from 'redux-actions';
import { getSchoolBirthday } from 'api';

// Action type constants
export const FETCH_START = 'report/schoolBirthday/FETCH_START';
export const FETCH_SUCCESS = 'report/schoolBirthday/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/schoolBirthday/FETCH_FAIL';
export const RESET_STATE = 'report/schoolBirthday/RESET_STATE';

// Action objects
export const schoolBirthdayFetchStart = createAction(FETCH_START);
export const schoolBirthdayFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolBirthdayFetchFail = createAction(FETCH_FAIL);
export const schoolBirthdayResetState = createAction(RESET_STATE);

export function schoolBirthdayFetch(id: string) {
  return dispatch => {
    dispatch(schoolBirthdayFetchStart());

    getSchoolBirthday((id: string))
      .done(payload => {
        dispatch(schoolBirthdayFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolBirthdayFetchFail(error));
      });
  };
}
