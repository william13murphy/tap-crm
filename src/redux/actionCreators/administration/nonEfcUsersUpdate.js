import { createAction } from 'redux-actions';

// Action type constants
export const FETCH_START = 'pos/nonEfcUsersUpdate/FETCH_START';
export const FETCH_SUCCESS = 'pos/nonEfcUsersUpdate/FETCH_SUCCESS';
export const FETCH_FAIL = 'pos/nonEfcUsersUpdate/FETCH_FAIL';
export const RESET_STATE = 'pos/nonEfcUsersUpdate/RESET_STATE';

// Action objects
export const nonEfcUsersUpdateFetchStart = createAction(FETCH_START);
export const nonEfcUsersUpdateFetchSuccess = createAction(FETCH_SUCCESS);
export const nonEfcUsersUpdateFetchFail = createAction(FETCH_FAIL);
export const nonEfcUsersUpdateResetState = createAction(RESET_STATE);

export function nonEfcUsersUpdate(payload) {
  return dispatch => {
    dispatch(nonEfcUsersUpdateFetchSuccess(payload));
  };
}

export function nonEfcUsersUpdateReset() {
  return dispatch => {
    dispatch(nonEfcUsersUpdateResetState());
  };
}
