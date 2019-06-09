import { createAction } from 'redux-actions';
import { getSchoolClass } from 'api';
// Action type constants
export const FETCH_START = 'school/classDetail/FETCH_START';
export const FETCH_SUCCESS = 'school/classDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/classDetail/FETCH_FAIL';
export const RESET_STATE = 'school/classDetail/RESET_STATE';

// Action objects
export const schoolClassDetailFetchStart = createAction(FETCH_START);
export const schoolClassDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolClassDetailFetchFail = createAction(FETCH_FAIL);
export const schoolClassDetailResetState = createAction(RESET_STATE);

export function schoolClassDetailFetch(id) {
  return dispatch => {
    dispatch(schoolClassDetailFetchStart());

    getSchoolClass(id)
      .done(payload => {
        dispatch(schoolClassDetailFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolClassDetailFetchFail(error));
      });
  };
}
