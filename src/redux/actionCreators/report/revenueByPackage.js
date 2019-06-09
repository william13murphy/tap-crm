import { createAction } from 'redux-actions';
import { getRevenueByPackage } from 'api';

// Action type constants
export const FETCH_START = 'report/revenueByPackage/FETCH_START';
export const FETCH_SUCCESS = 'report/revenueByPackage/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/revenueByPackage/FETCH_FAIL';
export const RESET_STATE = 'report/revenueByPackage/RESET_STATE';

// Action objects
export const revenueByPackageFetchStart = createAction(FETCH_START);
export const revenueByPackageFetchSuccess = createAction(FETCH_SUCCESS);
export const revenueByPackageFetchFail = createAction(FETCH_FAIL);
export const revenueByPackageResetState = createAction(RESET_STATE);

export function revenueByPackageFetch(id: string) {
  return dispatch => {
    dispatch(revenueByPackageFetchStart());

    getRevenueByPackage((id: string))
      .done(payload => {
        dispatch(revenueByPackageFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(revenueByPackageFetchFail(error));
      });
  };
}
