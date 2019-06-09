import { createAction } from 'redux-actions';
import { postSchoolInstructorCalendar } from 'api';

// Action type constants
export const FETCH_START = 'school/instructorCalendar/FETCH_START';
export const FETCH_SUCCESS = 'school/instructorCalendar/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/instructorCalendar/FETCH_FAIL';
export const RESET_STATE = 'school/instructorCalendar/RESET_STATE';

// Action objects
export const schoolInstructorCalendarFetchStart = createAction(FETCH_START);
export const schoolInstructorCalendarFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolInstructorCalendarFetchFail = createAction(FETCH_FAIL);
export const schoolInstructorCalendarResetState = createAction(RESET_STATE);

// Thunk action objects
export function schoolInstructorCalendarFetch(params) {
  return dispatch => {
    dispatch(schoolInstructorCalendarFetchStart());
    postSchoolInstructorCalendar(params)
      .done(payload => {
        dispatch(schoolInstructorCalendarFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolInstructorCalendarFetchFail(error));
      });
  };
}
