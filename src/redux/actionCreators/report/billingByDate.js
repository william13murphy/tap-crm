import { createAction } from 'redux-actions';
import { getBillingByDate } from 'api';
import moment from 'moment';

// Action type constants
export const FETCH_START = 'report/billingByDate/FETCH_START';
export const FETCH_SUCCESS = 'report/billingByDate/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/billingByDate/FETCH_FAIL';
export const RESET_STATE = 'report/billingByDate/RESET_STATE';

// Action objects
export const billingByDateFetchStart = createAction(FETCH_START);
export const billingByDateFetchSuccess = createAction(FETCH_SUCCESS);
export const billingByDateFetchFail = createAction(FETCH_FAIL);
export const billingByDateResetState = createAction(RESET_STATE);

const createModel = payload => {
  const dataKeys = Object.keys(payload).map((cV, i) => {
    return moment(cV).format('MMM-DD');
  });
  const model = Object.values(payload).map((cV, i) => {
    return {
      name: dataKeys[i],
      AmountBilled: cV,
    };
  });
  return model;
};

export function billingByDateFetch(id: string) {
  return dispatch => {
    dispatch(billingByDateFetchStart());

    getBillingByDate((id: string))
      .done(payload => {
        dispatch(billingByDateFetchSuccess(createModel(payload)));
      })
      .fail(error => {
        dispatch(billingByDateFetchFail(error));
      });
  };
}
