import { createAction } from 'redux-actions';
import { getSchoolStyleStudentsProgression } from 'api';

// Action type constants
export const FETCH_START = 'school/styleStudentsProgression/FETCH_START';
export const FETCH_SUCCESS = 'school/styleStudentsProgression/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleStudentsProgression/FETCH_FAIL';
export const RESET_STATE = 'school/styleStudentsProgression/RESET_STATE';

// Action objects
export const schoolStyleStudentsProgressionFetchStart = createAction(
  FETCH_START
);
export const schoolStyleStudentsProgressionFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolStyleStudentsProgressionFetchFail = createAction(FETCH_FAIL);
export const schoolStyleStudentsProgressionResetState = createAction(
  RESET_STATE
);

export function schoolStyleStudentsProgressionFetch(params: {}) {
  return dispatch => {
    dispatch(schoolStyleStudentsProgressionFetchStart());

    getSchoolStyleStudentsProgression(params)
      .done(payload => {
        dispatch(schoolStyleStudentsProgressionFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolStyleStudentsProgressionFetchFail(error));
      });
  };
}
