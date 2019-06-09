import { createAction } from 'redux-actions';
import { getRateMaster } from 'api';

// Action type constants
export const FETCH_START = 'utility/rateMaster/FETCH_START';
export const FETCH_SUCCESS = 'utility/rateMaster/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/rateMaster/FETCH_FAIL';
export const RESET_STATE = 'utility/rateMaster/RESET_STATE';

// Action objects
export const rateMasterFetchStart = createAction(FETCH_START);
export const rateMasterFetchSuccess = createAction(FETCH_SUCCESS);
export const rateMasterFetchFail = createAction(FETCH_FAIL);
export const rateMasterResetState = createAction(RESET_STATE);

export function rateMasterFetch() {
  return dispatch => {
    dispatch(rateMasterFetchStart());

    getRateMaster()
      .done(payload => {
        dispatch(rateMasterFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(rateMasterFetchFail(error));
      });
  };
}
