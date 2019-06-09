import { createAction } from 'redux-actions';
import { getSchoolStyles } from 'api';

// Action type constants
export const FETCH_START = 'school/styles/FETCH_START';
export const FETCH_SUCCESS = 'school/styles/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styles/FETCH_FAIL';
export const RESET_STATE = 'school/styles/RESET_STATE';

// Action objects
export const schoolStylesFetchStart = createAction(FETCH_START);
export const schoolStylesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStylesFetchFail = createAction(FETCH_FAIL);
export const schoolStylesResetState = createAction(RESET_STATE);

export function schoolStylesFetch(id: string) {
  return dispatch => {
    dispatch(schoolStylesFetchStart());

    getSchoolStyles((id: string))
      .done(schoolStyles => {
        dispatch(schoolStylesFetchSuccess(schoolStyles));
      })
      .fail(error => {
        dispatch(schoolStylesFetchFail(error));
      });
  };
}
