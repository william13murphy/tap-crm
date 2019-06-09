import { createAction } from 'redux-actions';
import { postSchoolSmartReportGenerateExcel } from 'api';

// Action type constants
export const FETCH_START = 'school/smartReportGenerateExcel/FETCH_START';
export const FETCH_SUCCESS = 'school/smartReportGenerateExcel/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/smartReportGenerateExcel/FETCH_FAIL';
export const RESET_STATE = 'school/smartReportGenerateExcel/RESET_STATE';

// Action objects
export const smartReportGenerateExcelFetchStart = createAction(FETCH_START);
export const smartReportGenerateExcelFetchSuccess = createAction(FETCH_SUCCESS);
export const smartReportGenerateExcelFetchFail = createAction(FETCH_FAIL);
export const smartReportGenerateExcelResetState = createAction(RESET_STATE);

export function smartReportGenerateExcelFetch(params) {
  return dispatch => {
    dispatch(smartReportGenerateExcelFetchStart());

    postSchoolSmartReportGenerateExcel(params)
      .done(payload => {
        dispatch(smartReportGenerateExcelFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(smartReportGenerateExcelFetchFail(error));
      });
  };
}
