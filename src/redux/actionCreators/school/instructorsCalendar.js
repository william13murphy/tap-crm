import { createAction } from 'redux-actions';
import { postSchoolInstructorsCalendar } from 'api';

// Action type constants
export const FETCH_START = 'school/instructorCalendar/FETCH_START';
export const FETCH_SUCCESS = 'school/instructorCalendar/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/instructorCalendar/FETCH_FAIL';
export const RESET_STATE = 'school/instructorCalendar/RESET_STATE';

// Action objects
export const schoolInstructorsCalendarFetchStart = createAction(FETCH_START);
export const schoolInstructorsCalendarFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolInstructorsCalendarFetchFail = createAction(FETCH_FAIL);
export const schoolInstructorsCalendarResetState = createAction(RESET_STATE);

// Thunk action objects
export function schoolInstructorsCalendarFetch(params) {
  return dispatch => {
    dispatch(schoolInstructorsCalendarFetchStart());
    postSchoolInstructorsCalendar(params)
      .done(payload => {
        dispatch(schoolInstructorsCalendarFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolInstructorsCalendarFetchFail(error));
      });
  };
}
