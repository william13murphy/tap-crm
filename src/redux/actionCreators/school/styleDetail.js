import { createAction } from 'redux-actions';
import { getSchoolStyleDetail } from 'api';

// Action type constants
export const FETCH_START = 'school/styleDetail/FETCH_START';
export const FETCH_SUCCESS = 'school/styleDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleDetail/FETCH_FAIL';
export const RESET_STATE = 'school/styleDetail/RESET_STATE';

// Action objects
export const schoolStyleDetailFetchStart = createAction(FETCH_START);
export const schoolStyleDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleDetailFetchFail = createAction(FETCH_FAIL);
export const schoolStyleDetailResetState = createAction(RESET_STATE);

export function schoolStyleDetailFetch(id) {
  return dispatch => {
    dispatch(schoolStyleDetailFetchStart());

    getSchoolStyleDetail(id)
      .done(schoolDetail => {
        dispatch(schoolStyleDetailFetchSuccess(schoolDetail));
      })
      .fail(error => {
        dispatch(schoolStyleDetailFetchFail(error));
      });
  };
}
