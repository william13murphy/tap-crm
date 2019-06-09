import { createAction } from 'redux-actions';
import { getStateProvinceMaster } from 'api';

// Action type constants
export const FETCH_START = 'utility/stateProvinceMaster/FETCH_START';
export const FETCH_SUCCESS = 'utility/stateProvinceMaster/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/stateProvinceMaster/FETCH_FAIL';
export const RESET_STATE = 'utility/stateProvinceMaster/RESET_STATE';

// Action objects
export const stateProvinceMasterFetchStart = createAction(FETCH_START);
export const stateProvinceMasterFetchSuccess = createAction(FETCH_SUCCESS);
export const stateProvinceMasterFetchFail = createAction(FETCH_FAIL);
export const stateProvinceMasterResetState = createAction(RESET_STATE);

export function stateProvinceMasterFetch() {
  return dispatch => {
    dispatch(stateProvinceMasterFetchStart());

    getStateProvinceMaster()
      .done(payload => {
        dispatch(stateProvinceMasterFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(stateProvinceMasterFetchFail(error));
      });
  };
}
