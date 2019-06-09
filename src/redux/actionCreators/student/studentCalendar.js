import { createAction } from 'redux-actions';
import { postStudentCalendar } from 'api';

// Action type constants
export const FETCH_START = 'student/studentCalendar/FETCH_START';
export const FETCH_SUCCESS = 'student/studentCalendar/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/studentCalendar/FETCH_FAIL';
export const RESET_STATE = 'student/studentCalendar/RESET_STATE';

// Action objects
export const studentCalendarFetchStart = createAction(FETCH_START);
export const studentCalendarFetchSuccess = createAction(FETCH_SUCCESS);
export const studentCalendarFetchFail = createAction(FETCH_FAIL);
export const studentCalendarResetState = createAction(RESET_STATE);

// Thunk action objects
export function studentCalendarFetch(formData) {
  return dispatch => {
    dispatch(studentCalendarFetchStart());
    postStudentCalendar(formData)
      .done(payload => {
        dispatch(studentCalendarFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(studentCalendarFetchFail(error));
      });
  };
}
