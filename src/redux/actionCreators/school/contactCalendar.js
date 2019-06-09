import { createAction } from 'redux-actions';
import { postSchoolContactCalendar } from 'api';

// Action type constants
export const FETCH_START = 'school/contactCalendar/FETCH_START';
export const FETCH_SUCCESS = 'school/contactCalendar/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/contactCalendar/FETCH_FAIL';
export const RESET_STATE = 'school/contactCalendar/RESET_STATE';

// Action objects
export const schoolContactCalendarFetchStart = createAction(FETCH_START);
export const schoolContactCalendarFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolContactCalendarFetchFail = createAction(FETCH_FAIL);
export const schoolContactCalendarResetState = createAction(RESET_STATE);

// Thunk action objects
export function schoolContactCalendarFetch(params) {
  return dispatch => {
    dispatch(schoolContactCalendarFetchStart());
    postSchoolContactCalendar(params)
      .done(payload => {
        dispatch(schoolContactCalendarFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolContactCalendarFetchFail(error));
      });
  };
}
