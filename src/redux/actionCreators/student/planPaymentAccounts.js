import { createAction } from 'redux-actions';
import { getPlanPaymentAccounts } from 'api';

// Action type constants
export const FETCH_START = 'student/planPaymentAccounts/FETCH_START';
export const FETCH_SUCCESS = 'student/planPaymentAccounts/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/planPaymentAccounts/FETCH_FAIL';
export const RESET_STATE = 'student/planPaymentAccounts/RESET_STATE';

// Action objects
export const planPaymentAccountsFetchStart = createAction(FETCH_START);
export const planPaymentAccountsFetchSuccess = createAction(FETCH_SUCCESS);
export const planPaymentAccountsFetchFail = createAction(FETCH_FAIL);
export const planPaymentAccountsResetState = createAction(RESET_STATE);

export function planPaymentAccountsFetch(id: string) {
  return dispatch => {
    dispatch(planPaymentAccountsFetchStart());

    getPlanPaymentAccounts((id: string))
      .done(planPaymentAccounts => {
        dispatch(planPaymentAccountsFetchSuccess(planPaymentAccounts));
      })
      .fail(error => {
        dispatch(planPaymentAccountsFetchFail(error));
      });
  };
}
