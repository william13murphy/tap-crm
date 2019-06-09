import { createAction } from 'redux-actions';
import { getFinanceDisbursmentsReport } from 'api';

// Action type constants
export const FETCH_START = 'report/getFinanceDisbursements/FETCH_START';
export const FETCH_SUCCESS = 'report/getFinanceDisbursements/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/getFinanceDisbursements/FETCH_FAIL';
export const RESET_STATE = 'report/getFinanceDisbursements/RESET_STATE';

// Action objects
export const financeDisbursementsFetchStart = createAction(FETCH_START);
export const financeDisbursementsFetchSuccess = createAction(FETCH_SUCCESS);
export const financeDisbursementsFetchFail = createAction(FETCH_FAIL);
export const financeDisbursementsResetState = createAction(RESET_STATE);

export function FinanceDisbursementsFetch(id: string) {
  return dispatch => {
    dispatch(financeDisbursementsFetchStart());

    getFinanceDisbursmentsReport((id: string))
      .done(payload => {
        dispatch(financeDisbursementsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(financeDisbursementsFetchFail(error));
      });
  };
}
