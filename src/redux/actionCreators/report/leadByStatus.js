import { createAction } from 'redux-actions';
import { getMarketingLeadByStatus } from 'api';

// Action type constants
export const FETCH_START = 'report/leadByStatus/FETCH_START';
export const FETCH_SUCCESS = 'report/leadByStatus/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/leadByStatus/FETCH_FAIL';
export const RESET_STATE = 'report/leadByStatus/RESET_STATE';

// Action objects
export const leadByStatusFetchStart = createAction(FETCH_START);
export const leadByStatusFetchSuccess = createAction(FETCH_SUCCESS);
export const leadByStatusFetchFail = createAction(FETCH_FAIL);
export const leadByStatusResetState = createAction(RESET_STATE);

export function leadByStatusFetch(id: string) {
  return dispatch => {
    dispatch(leadByStatusFetchStart());

    getMarketingLeadByStatus((id: string))
      .done(payload => {
        dispatch(leadByStatusFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(leadByStatusFetchFail(error));
      });
  };
}
