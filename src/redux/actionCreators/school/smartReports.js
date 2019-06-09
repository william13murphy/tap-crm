import { createAction } from 'redux-actions';
import { getSchoolSmartReports } from 'api';

// Action type constants
export const FETCH_START = 'school/smartReports/FETCH_START';
export const FETCH_SUCCESS = 'school/smartReports/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/smartReports/FETCH_FAIL';
export const RESET_STATE = 'school/smartReports/RESET_STATE';

// Action objects
export const schoolSmartReportsFetchStart = createAction(FETCH_START);
export const schoolSmartReportsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolSmartReportsFetchFail = createAction(FETCH_FAIL);
export const schoolSmartReportsResetState = createAction(RESET_STATE);

export function schoolSmartReportsFetch(id) {
  return dispatch => {
    dispatch(schoolSmartReportsFetchStart());

    getSchoolSmartReports(id)
      .done(payload => {
        dispatch(schoolSmartReportsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(schoolSmartReportsFetchFail(error));
      });
  };
}
