import { createAction } from 'redux-actions';
import { getAllBeltMaster } from 'api';

// Action type constants
export const FETCH_START = 'utility/allBeltMaster/FETCH_START';
export const FETCH_SUCCESS = 'utility/allBeltMaster/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/allBeltMaster/FETCH_FAIL';
export const RESET_STATE = 'utility/allBeltMaster/RESET_STATE';

// Action objects
export const allBeltMasterFetchStart = createAction(FETCH_START);
export const allBeltMasterFetchSuccess = createAction(FETCH_SUCCESS);
export const allBeltMasterFetchFail = createAction(FETCH_FAIL);
export const allBeltMasterResetState = createAction(RESET_STATE);

export function allBeltMasterFetch() {
  return dispatch => {
    dispatch(allBeltMasterFetchStart());

    getAllBeltMaster()
      .done(payload => {
        dispatch(allBeltMasterFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allBeltMasterFetchFail(error));
      });
  };
}
