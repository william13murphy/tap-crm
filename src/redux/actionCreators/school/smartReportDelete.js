import { createAction } from 'redux-actions';
import { deleteSchoolSmartReport } from 'api';

// Action type constants
export const POST_START = 'school/smartReportDelete/POST_START';
export const POST_SUCCESS = 'school/smartReportDelete/POST_SUCCESS';
export const POST_FAIL = 'school/smartReportDelete/POST_FAIL';
export const FORM_RESET = 'school/smartReportDelete/FORM_RESET';

// Action objects
export const smartReportDeleteStart = createAction(POST_START);
export const smartReportDeleteSuccess = createAction(POST_SUCCESS);
export const smartReportDeleteFail = createAction(POST_FAIL);
export const smartReportDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function smartReportDelete(formData) {
  return dispatch => {
    dispatch(smartReportDeleteStart());

    deleteSchoolSmartReport(formData)
      .done(payload => {
        dispatch(smartReportDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(smartReportDeleteFail(error));
      });
  };
}
