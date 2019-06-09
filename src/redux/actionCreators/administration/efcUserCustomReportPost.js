import { createAction } from 'redux-actions';
import { postEfcUserCustomReport } from 'api';

// Action type constants
export const POST_START = 'administration/efcUserCustomReportPost/POST_START';
export const POST_SUCCESS =
  'administration/efcUserCustomReportPost/POST_SUCCESS';
export const POST_FAIL = 'administration/efcUserCustomReportPost/POST_FAIL';
export const FORM_RESET = 'administration/efcUserCustomReportPost/FORM_RESET';

// Action objects
export const efcUserCustomReportPostStart = createAction(POST_START);
export const efcUserCustomReportPostSuccess = createAction(POST_SUCCESS);
export const efcUserCustomReportPostFail = createAction(POST_FAIL);
export const efcUserCustomReportPostReset = createAction(FORM_RESET);

// Thunk action objects
export function efcUserCustomReportPost(formData) {
  return dispatch => {
    dispatch(efcUserCustomReportPostStart());

    postEfcUserCustomReport(formData)
      .done(userId => {
        dispatch(
          efcUserCustomReportPostSuccess({
            userId,
          })
        );
      })
      .fail(error => {
        dispatch(efcUserCustomReportPostFail(error));
      });
  };
}
