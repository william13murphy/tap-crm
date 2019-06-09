import { createAction } from 'redux-actions';
import { getEfcUserCustomReport } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserCustomReport/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserCustomReport/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserCustomReport/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserCustomReport/RESET_STATE';

// Action objects
export const efcUserCustomReportFetchStart = createAction(FETCH_START);
export const efcUserCustomReportFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserCustomReportFetchFail = createAction(FETCH_FAIL);
export const efcUserCustomReportResetState = createAction(RESET_STATE);

export function efcUserCustomReportFetch(id) {
  return dispatch => {
    dispatch(efcUserCustomReportFetchStart());

    getEfcUserCustomReport(id)
      .done(allUsers => {
        dispatch(efcUserCustomReportFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserCustomReportFetchFail(error));
      });
  };
}
