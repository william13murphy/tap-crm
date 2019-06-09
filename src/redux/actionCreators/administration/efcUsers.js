import { createAction } from 'redux-actions';
import { getEfcUsers } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUsers/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUsers/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUsers/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUsers/RESET_STATE';

// Action objects
export const efcUsersFetchStart = createAction(FETCH_START);
export const efcUsersFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUsersFetchFail = createAction(FETCH_FAIL);
export const efcUsersResetState = createAction(RESET_STATE);

export function efcUsersFetch() {
  return dispatch => {
    dispatch(efcUsersFetchStart());

    getEfcUsers()
      .done(efcUsers => {
        dispatch(efcUsersFetchSuccess(efcUsers));
      })
      .fail(error => {
        dispatch(efcUsersFetchFail(error));
      });
  };
}
