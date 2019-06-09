import { createAction } from 'redux-actions';
import { getSoftExit } from 'api';

// Action type constants
export const FETCH_START = 'report/softExit/FETCH_START';
export const FETCH_SUCCESS = 'report/softExit/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/softExit/FETCH_FAIL';
export const RESET_STATE = 'report/softExit/RESET_STATE';

// Action objects
export const softExitFetchStart = createAction(FETCH_START);
export const softExitFetchSuccess = createAction(FETCH_SUCCESS);
export const softExitFetchFail = createAction(FETCH_FAIL);
export const softExitResetState = createAction(RESET_STATE);

export function softExitFetch(schoolId: string) {
  return dispatch => {
    dispatch(softExitFetchStart());

    getSoftExit((schoolId: string))
      .done(payload => {
        dispatch(softExitFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(softExitFetchFail(error));
      });
  };
}
