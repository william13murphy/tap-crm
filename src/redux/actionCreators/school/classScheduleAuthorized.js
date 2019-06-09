import { createAction } from 'redux-actions';
import { getSchoolClassScheduleAuthorized } from 'api';
// Action type constants
export const FETCH_START = 'school/classScheduleAuthorized/FETCH_START';
export const FETCH_SUCCESS = 'school/classScheduleAuthorized/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/classScheduleAuthorized/FETCH_FAIL';
export const RESET_STATE = 'school/classScheduleAuthorized/RESET_STATE';

// Action objects
export const schoolClassScheduleAuthorizedFetchStart = createAction(
  FETCH_START
);
export const schoolClassScheduleAuthorizedFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolClassScheduleAuthorizedFetchFail = createAction(FETCH_FAIL);
export const schoolClassScheduleAuthorizedResetState = createAction(
  RESET_STATE
);

export function schoolClassScheduleAuthorizedFetch(id) {
  return dispatch => {
    dispatch(schoolClassScheduleAuthorizedFetchStart());

    getSchoolClassScheduleAuthorized(id)
      .done(payload => {
        dispatch(schoolClassScheduleAuthorizedFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClassScheduleAuthorizedFetchFail(error));
      });
  };
}
