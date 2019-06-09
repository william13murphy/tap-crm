import { createAction } from 'redux-actions';
import { getSchoolClassScheduleProgression } from 'api';
// Action type constants
export const FETCH_START = 'school/classScheduleProgression/FETCH_START';
export const FETCH_SUCCESS = 'school/classScheduleProgression/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/classScheduleProgression/FETCH_FAIL';
export const RESET_STATE = 'school/classScheduleProgression/RESET_STATE';

// Action objects
export const schoolClassScheduleProgressionFetchStart = createAction(
  FETCH_START
);
export const schoolClassScheduleProgressionFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolClassScheduleProgressionFetchFail = createAction(FETCH_FAIL);
export const schoolClassScheduleProgressionResetState = createAction(
  RESET_STATE
);

export function schoolClassScheduleProgressionFetch(id) {
  return dispatch => {
    dispatch(schoolClassScheduleProgressionFetchStart());

    getSchoolClassScheduleProgression(id)
      .done(payload => {
        dispatch(schoolClassScheduleProgressionFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClassScheduleProgressionFetchFail(error));
      });
  };
}
