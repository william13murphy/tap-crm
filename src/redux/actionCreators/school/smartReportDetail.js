import { createAction } from 'redux-actions';
import { getSchoolSmartReportDetail } from 'api';

// Action type constants
export const FETCH_START = 'school/smartReportDetail/FETCH_START';
export const FETCH_SUCCESS = 'school/smartReportDetail/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/smartReportDetail/FETCH_FAIL';
export const RESET_STATE = 'school/smartReportDetail/RESET_STATE';

// Action objects
export const schoolSmartReportDetailFetchStart = createAction(FETCH_START);
export const schoolSmartReportDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolSmartReportDetailFetchFail = createAction(FETCH_FAIL);
export const schoolSmartReportDetailResetState = createAction(RESET_STATE);

export function schoolSmartReportDetailFetch(id) {
  return dispatch => {
    dispatch(schoolSmartReportDetailFetchStart());

    getSchoolSmartReportDetail(id)
      .done(payload => {
        dispatch(schoolSmartReportDetailFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolSmartReportDetailFetchFail(error));
      });
  };
}
