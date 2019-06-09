import { createAction } from 'redux-actions';
import { getSchoolRates } from 'api';

// Action type constants
export const FETCH_START = 'school/rates/FETCH_START';
export const FETCH_SUCCESS = 'school/rates/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/rates/FETCH_FAIL';
export const RESET_STATE = 'school/rates/RESET_STATE';

// Action objects
export const schoolRatesFetchStart = createAction(FETCH_START);
export const schoolRatesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolRatesFetchFail = createAction(FETCH_FAIL);
export const schoolRatesResetState = createAction(RESET_STATE);

export function schoolRatesFetch(id: string) {
  return dispatch => {
    dispatch(schoolRatesFetchStart());

    getSchoolRates((id: string))
      .done(schoolRates => {
        dispatch(schoolRatesFetchSuccess(schoolRates));
      })
      .fail(error => {
        dispatch(schoolRatesFetchFail(error));
      });
  };
}
