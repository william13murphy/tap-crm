import { createAction } from 'redux-actions';
import { getFinanceDeductionsReport } from 'api';

// Action type constants
export const FETCH_START = 'report/financeDeductions/FETCH_START';
export const FETCH_SUCCESS = 'report/financeDeductions/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/financeDeductions/FETCH_FAIL';
export const RESET_STATE = 'report/financeDeductions/RESET_STATE';

// Action objects
export const financeDeductionsFetchStart = createAction(FETCH_START);
export const financeDeductionsFetchSuccess = createAction(FETCH_SUCCESS);
export const financeDeductionsFetchFail = createAction(FETCH_FAIL);
export const financeDeductionsResetState = createAction(RESET_STATE);

export function financeDeductionsFetch(id: string) {
  return dispatch => {
    dispatch(financeDeductionsFetchStart());

    getFinanceDeductionsReport((id: string))
      .done(payload => {
        dispatch(financeDeductionsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(financeDeductionsFetchFail(error));
      });
  };
}
