import { createAction } from 'redux-actions';
import { getRevenueBySource } from 'api';

// Action type constants
export const FETCH_START = 'report/revenueBySource/FETCH_START';
export const FETCH_SUCCESS = 'report/revenueBySource/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/revenueBySource/FETCH_FAIL';
export const RESET_STATE = 'report/revenueBySource/RESET_STATE';

// Action objects
export const revenueBySourceFetchStart = createAction(FETCH_START);
export const revenueBySourceFetchSuccess = createAction(FETCH_SUCCESS);
export const revenueBySourceFetchFail = createAction(FETCH_FAIL);
export const revenueBySourceResetState = createAction(RESET_STATE);

export function revenueBySourceFetch(id: string) {
  return dispatch => {
    dispatch(revenueBySourceFetchStart());

    getRevenueBySource((id: string))
      .done(payload => {
        dispatch(revenueBySourceFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(revenueBySourceFetchFail(error));
      });
  };
}
