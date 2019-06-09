import { createAction } from 'redux-actions';
import { getRevenueByProgram } from 'api';

// Action type constants
export const FETCH_START = 'report/revenueByProgram/FETCH_START';
export const FETCH_SUCCESS = 'report/revenueByProgram/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/revenueByProgram/FETCH_FAIL';
export const RESET_STATE = 'report/revenueByProgram/RESET_STATE';

// Action objects
export const revenueByProgramFetchStart = createAction(FETCH_START);
export const revenueByProgramFetchSuccess = createAction(FETCH_SUCCESS);
export const revenueByProgramFetchFail = createAction(FETCH_FAIL);
export const revenueByProgramResetState = createAction(RESET_STATE);

export function revenueByProgramFetch(id: string) {
  return dispatch => {
    dispatch(revenueByProgramFetchStart());

    getRevenueByProgram((id: string))
      .done(payload => {
        dispatch(revenueByProgramFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(revenueByProgramFetchFail(error));
      });
  };
}
