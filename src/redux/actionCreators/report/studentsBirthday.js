import { createAction } from 'redux-actions';
import { getStudentsBirthdayReport } from 'api';
// Action type constants
export const FETCH_START = 'school/studentsBirthday/FETCH_START';
export const FETCH_SUCCESS = 'school/studentsBirthday/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/studentsBirthday/FETCH_FAIL';
export const RESET_STATE = 'report/studentsBirthday/RESET_STATE';

// Action objects
export const studentsBirthdayFetchStart = createAction(FETCH_START);
export const studentsBirthdayFetchSuccess = createAction(FETCH_SUCCESS);
export const studentsBirthdayFetchFail = createAction(FETCH_FAIL);
export const studentsBirthdayResetState = createAction(RESET_STATE);

export function studentsBirthdayFetch(params: Object) {
  return dispatch => {
    dispatch(studentsBirthdayFetchStart());

    getStudentsBirthdayReport(params)
      .done(payload => {
        dispatch(studentsBirthdayFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentsBirthdayFetchFail(error));
      });
  };
}
