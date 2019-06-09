import { createAction } from 'redux-actions';
import { getSchoolAnemicDetail } from 'api';

// Action type constants
export const FETCH_START = 'school/anemicDetail/FETCH_START';
export const FETCH_SUCCESS = 'school/anemicDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/anemicDetail/FETCH_FAIL';
export const RESET_STATE = 'school/anemicDetail/RESET_STATE';

// Action objects
export const schoolAnemicDetailFetchStart = createAction(FETCH_START);
export const schoolAnemicDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolAnemicDetailFetchFail = createAction(FETCH_FAIL);
export const schoolAnemicDetailResetState = createAction(RESET_STATE);

export function schoolAnemicDetailFetch(id) {
  return dispatch => {
    dispatch(schoolAnemicDetailFetchStart());

    getSchoolAnemicDetail(id)
      .done(schoolDetail => {
        dispatch(schoolAnemicDetailFetchSuccess(schoolDetail));
      })
      .fail(error => {
        dispatch(schoolAnemicDetailFetchFail(error));
      });
  };
}
