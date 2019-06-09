import { createAction } from 'redux-actions';
import { getEomByMonthByYearReport } from 'api';

// Action type constants
export const FETCH_START = 'report/eomByMonthByYear/FETCH_START';
export const FETCH_SUCCESS = 'report/eomByMonthByYear/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/eomByMonthByYear/FETCH_FAIL';
export const RESET_STATE = 'report/eomByMonthByYear/RESET_STATE';

// Action objects
export const eomByMonthByYearFetchStart = createAction(FETCH_START);
export const eomByMonthByYearFetchSuccess = createAction(FETCH_SUCCESS);
export const eomByMonthByYearFetchFail = createAction(FETCH_FAIL);
export const eomByMonthByYearResetState = createAction(RESET_STATE);

export function eomByMonthByYearFetch(params) {
  return dispatch => {
    dispatch(eomByMonthByYearFetchStart());

    getEomByMonthByYearReport(params)
      .done(payload => {
        dispatch(eomByMonthByYearFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(eomByMonthByYearFetchFail(error));
      });
  };
}

export function eomByMonthByYearReset() {
  return dispatch => {
    dispatch(eomByMonthByYearResetState());
  };
}
