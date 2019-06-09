import { createAction } from 'redux-actions';
import { postSchoolCalendar } from 'api';

// Action type constants
export const FETCH_START = 'school/calendar/FETCH_START';
export const FETCH_SUCCESS = 'school/calendar/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/calendar/FETCH_FAIL';
export const RESET_STATE = 'school/calendar/RESET_STATE';

// Action objects
export const schoolCalendarFetchStart = createAction(FETCH_START);
export const schoolCalendarFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolCalendarFetchFail = createAction(FETCH_FAIL);
export const schoolCalendarResetState = createAction(RESET_STATE);

// Thunk action objects
export function schoolCalendarFetch(params) {
  return dispatch => {
    dispatch(schoolCalendarFetchStart());

    postSchoolCalendar(params)
      .done(payload => {
        dispatch(schoolCalendarFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolCalendarFetchFail(error));
      });
  };
}
