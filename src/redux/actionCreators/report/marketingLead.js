import { createAction } from 'redux-actions';
import { getMarketingLead } from 'api';

// Action type constants
export const FETCH_START = 'report/marketingLead/FETCH_START';
export const FETCH_SUCCESS = 'report/marketingLead/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/marketingLead/FETCH_FAIL';
export const RESET_STATE = 'report/marketingLead/RESET_STATE';

// Action objects
export const marketingLeadFetchStart = createAction(FETCH_START);
export const marketingLeadFetchSuccess = createAction(FETCH_SUCCESS);
export const marketingLeadFetchFail = createAction(FETCH_FAIL);
export const marketingLeadResetState = createAction(RESET_STATE);

export function marketingLeadFetch(id: string) {
  return dispatch => {
    dispatch(marketingLeadFetchStart());

    getMarketingLead((id: string))
      .done(payload => {
        dispatch(marketingLeadFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(marketingLeadFetchFail(error));
      });
  };
}
