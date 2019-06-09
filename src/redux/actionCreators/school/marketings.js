import { createAction } from 'redux-actions';
import { getSchoolMarketings } from 'api';

// Action type constants
export const FETCH_START = 'school/marketings/FETCH_START';
export const FETCH_SUCCESS = 'school/marketings/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/marketings/FETCH_FAIL';
export const RESET_STATE = 'school/marketings/RESET_STATE';

// Action objects
export const schoolMarketingsFetchStart = createAction(FETCH_START);
export const schoolMarketingsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolMarketingsFetchFail = createAction(FETCH_FAIL);
export const schoolMartetingsResetState = createAction(RESET_STATE);

export function schoolMarketingsFetch(id: string) {
  return dispatch => {
    dispatch(schoolMarketingsFetchStart());

    getSchoolMarketings((id: string))
      .done(schoolMarketings => {
        dispatch(schoolMarketingsFetchSuccess(schoolMarketings));
      })
      .fail(error => {
        dispatch(schoolMarketingsFetchFail(error));
      });
  };
}
