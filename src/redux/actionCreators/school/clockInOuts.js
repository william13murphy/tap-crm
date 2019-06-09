import { createAction } from 'redux-actions';
import { getSchoolClockInOuts } from 'api';

// Action type constants
export const FETCH_START = 'school/clockInOuts/FETCH_START';
export const FETCH_SUCCESS = 'school/clockInOuts/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/clockInOuts/FETCH_FAIL';
export const RESET_STATE = 'school/clockInOuts/RESET_STATE';

// Action objects
export const schoolClockInOutsFetchStart = createAction(FETCH_START);
export const schoolClockInOutsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolClockInOutsFetchFail = createAction(FETCH_FAIL);
export const schoolClockInOutsResetState = createAction(RESET_STATE);

export function schoolClockInOutsFetch(id: string) {
  return dispatch => {
    dispatch(schoolClockInOutsFetchStart());

    getSchoolClockInOuts((id: string))
      .done(payload => {
        dispatch(schoolClockInOutsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClockInOutsFetchFail(error));
      });
  };
}
