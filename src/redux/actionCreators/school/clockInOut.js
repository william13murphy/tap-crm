import { createAction } from 'redux-actions';
import { getSchoolClockInOut } from 'api';

// Action type constants
export const FETCH_START = 'school/clockInOut/FETCH_START';
export const FETCH_SUCCESS = 'school/clockInOut/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/clockInOut/FETCH_FAIL';
export const RESET_STATE = 'school/clockInOut/RESET_STATE';

// Action objects
export const schoolClockInOutFetchStart = createAction(FETCH_START);
export const schoolClockInOutFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolClockInOutFetchFail = createAction(FETCH_FAIL);
export const schoolClockInOutResetState = createAction(RESET_STATE);

export function schoolClockInOutFetch(id: string) {
  return dispatch => {
    dispatch(schoolClockInOutFetchStart());

    getSchoolClockInOut((id: string))
      .done(payload => {
        dispatch(schoolClockInOutFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClockInOutFetchFail(error));
      });
  };
}
