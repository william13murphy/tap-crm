import { createAction } from 'redux-actions';
import { postSchoolSmartReportGenerate } from 'api';

// Action type constants
export const POST_START = 'school/smartReportGeneratePost/POST_START';
export const POST_SUCCESS = 'school/smartReportGeneratePost/POST_SUCCESS';
export const POST_FAIL = 'school/smartReportGeneratePost/POST_FAIL';
export const FORM_RESET = 'school/smartReportGeneratePost/FORM_RESET';

// Action objects
export const schoolSmartReportGeneratePostStart = createAction(POST_START);
export const schoolSmartReportGeneratePostSuccess = createAction(POST_SUCCESS);
export const schoolSmartReportGeneratePostFail = createAction(POST_FAIL);
export const schoolSmartReportGenerateFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolSmartReportGeneratePost(formData) {
  return dispatch => {
    dispatch(schoolSmartReportGeneratePostStart());

    postSchoolSmartReportGenerate(formData)
      .done(data => {
        dispatch(schoolSmartReportGeneratePostSuccess(data));
      })
      .fail(error => {
        dispatch(schoolSmartReportGeneratePostFail(error));
      });
  };
}
