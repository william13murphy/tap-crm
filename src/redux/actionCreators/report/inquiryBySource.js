import { createAction } from 'redux-actions';
import { getMarketingInquiryBySource } from 'api';

// Action type constants
export const FETCH_START = 'report/inquiryBySource/FETCH_START';
export const FETCH_SUCCESS = 'report/inquiryBySource/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/inquiryBySource/FETCH_FAIL';
export const RESET_STATE = 'report/inquiryBySource/RESET_STATE';

// Action objects
export const inquiryBySourceFetchStart = createAction(FETCH_START);
export const inquiryBySourceFetchSuccess = createAction(FETCH_SUCCESS);
export const inquiryBySourceFetchFail = createAction(FETCH_FAIL);
export const inquiryBySourceResetState = createAction(RESET_STATE);

export function inquiryBySourceFetch(id: string) {
  return dispatch => {
    dispatch(inquiryBySourceFetchStart());

    getMarketingInquiryBySource((id: string))
      .done(payload => {
        dispatch(inquiryBySourceFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(inquiryBySourceFetchFail(error));
      });
  };
}
