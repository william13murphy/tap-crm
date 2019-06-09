import { createAction } from 'redux-actions';
import { getSchoolStyleRateAdditionalClass } from 'api';

// Action type constants
export const FETCH_START = 'school/styleRateAdditionalClass/FETCH_START';
export const FETCH_SUCCESS = 'school/styleRateAdditionalClass/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleRateAdditionalClass/FETCH_FAIL';
export const RESET_STATE = 'school/styleRateAdditionalClass/RESET_STATE';

// Action objects
export const schoolStyleRateAdditionalClassFetchStart = createAction(
  FETCH_START
);
export const schoolStyleRateAdditionalClassFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const schoolStyleRateAdditionalClassFetchFail = createAction(FETCH_FAIL);
export const schoolStyleRateAdditionalClassResetState = createAction(
  RESET_STATE
);

export function schoolStyleRateAdditionalClassFetch(id) {
  return dispatch => {
    dispatch(schoolStyleRateAdditionalClassFetchStart());

    getSchoolStyleRateAdditionalClass(id)
      .done(payload => {
        dispatch(schoolStyleRateAdditionalClassFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolStyleRateAdditionalClassFetchFail(error));
      });
  };
}
