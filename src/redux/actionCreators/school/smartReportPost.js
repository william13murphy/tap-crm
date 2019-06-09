import { createAction } from 'redux-actions';
import { saveSchoolSmartReport } from 'api';

// Action type constants
export const POST_START = 'school/smartReportPost/POST_START';
export const POST_SUCCESS = 'school/smartReportPost/POST_SUCCESS';
export const POST_FAIL = 'school/smartReportPost/POST_FAIL';
export const FORM_RESET = 'school/smartReportPost/FORM_RESET';

// Action objects
export const schoolSmartReportPostStart = createAction(POST_START);
export const schoolSmartReportPostSuccess = createAction(POST_SUCCESS);
export const schoolSmartReportPostFail = createAction(POST_FAIL);
export const schoolSmartReportFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolSmartReportPost(formData) {
  return dispatch => {
    dispatch(schoolSmartReportPostStart());

    saveSchoolSmartReport(formData)
      .done(() => {
        dispatch(schoolSmartReportPostSuccess());
      })
      .fail(error => {
        dispatch(schoolSmartReportPostFail(error));
      });
  };
}
