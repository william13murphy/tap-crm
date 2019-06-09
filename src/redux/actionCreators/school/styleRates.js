import { createAction } from 'redux-actions';
import { getSchoolStyleRates } from 'api';

// Action type constants
export const FETCH_START = 'school/styleRates/FETCH_START';
export const FETCH_SUCCESS = 'school/styleRates/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/styleRates/FETCH_FAIL';
export const RESET_STATE = 'school/styleRates/RESET_STATE';

// Action objects
export const schoolStyleRatesFetchStart = createAction(FETCH_START);
export const schoolStyleRatesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolStyleRatesFetchFail = createAction(FETCH_FAIL);
export const schoolStyleRatesResetState = createAction(RESET_STATE);

export function schoolStyleRatesFetch(id) {
  return dispatch => {
    dispatch(schoolStyleRatesFetchStart());

    getSchoolStyleRates(id)
      .done(payload => {
        dispatch(schoolStyleRatesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolStyleRatesFetchFail(error));
      });
  };
}
