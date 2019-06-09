import { createAction } from 'redux-actions';
import { getAdminLog } from 'api';

// Action type constants
export const FETCH_START = 'utility/adminLog/FETCH_START';
export const FETCH_SUCCESS = 'utility/adminLog/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/adminLog/FETCH_FAIL';
export const RESET_STATE = 'utility/adminLog/RESET_STATE';

// Action objects
export const adminLogFetchStart = createAction(FETCH_START);
export const adminLogFetchSuccess = createAction(FETCH_SUCCESS);
export const adminLogFetchFail = createAction(FETCH_FAIL);
export const adminLogResetState = createAction(RESET_STATE);

export function adminLogFetch() {
  return dispatch => {
    dispatch(adminLogFetchStart());

    getAdminLog()
      .done(payload => {
        dispatch(adminLogFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(adminLogFetchFail(error));
      });
  };
}
