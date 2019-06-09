import { createAction } from 'redux-actions';
import { getSchools } from 'api';

// Action type constants
export const FETCH_START = 'school/allSchools/FETCH_START';
export const FETCH_SUCCESS = 'school/allSchools/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/allSchools/FETCH_FAIL';
export const RESET_STATE = 'school/allSchools/RESET_STATE';

// Action objects
export const allSchoolsFetchStart = createAction(FETCH_START);
export const allSchoolsFetchSuccess = createAction(FETCH_SUCCESS);
export const allSchoolsFetchFail = createAction(FETCH_FAIL);
export const allSchoolsResetState = createAction(RESET_STATE);

export function allSchoolsFetch() {
  return dispatch => {
    dispatch(allSchoolsFetchStart());

    getSchools()
      .done(payload => {
        dispatch(allSchoolsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allSchoolsFetchFail(error));
      });
  };
}
