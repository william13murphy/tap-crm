import { createAction } from 'redux-actions';
import { getEomExcelReport } from 'api';

// Action type constants
export const FETCH_START = 'report/getEomExcel/FETCH_START';
export const FETCH_SUCCESS = 'report/getEomExcel/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/getEomExcel/FETCH_FAIL';
export const RESET_STATE = 'report/getEomExcel/RESET_STATE';

// Action objects
export const eomExcelFetchStart = createAction(FETCH_START);
export const eomExcelFetchSuccess = createAction(FETCH_SUCCESS);
export const eomExcelFetchFail = createAction(FETCH_FAIL);
export const eomExcelResetState = createAction(RESET_STATE);

export function eomExcelFetch(id: string) {
  return dispatch => {
    dispatch(eomExcelFetchStart());

    getEomExcelReport((id: string))
      .done(payload => {
        dispatch(eomExcelFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(eomExcelFetchFail(error));
      });
  };
}
