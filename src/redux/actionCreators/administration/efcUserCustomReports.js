import { createAction } from 'redux-actions';
import { getEfcUserCustomReports } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserCustomReports/FETCH_START';
export const FETCH_SUCCESS =
  'administration/efcUserCustomReports/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserCustomReports/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserCustomReports/RESET_STATE';

// Action objects
export const efcUserCustomReportsFetchStart = createAction(FETCH_START);
export const efcUserCustomReportsFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserCustomReportsFetchFail = createAction(FETCH_FAIL);
export const efcUserCustomReportsResetState = createAction(RESET_STATE);

export function efcUserCustomReportsFetch(id) {
  return dispatch => {
    dispatch(efcUserCustomReportsFetchStart());

    getEfcUserCustomReports(id)
      .done(allUsers => {
        dispatch(efcUserCustomReportsFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(efcUserCustomReportsFetchFail(error));
      });
  };
}
