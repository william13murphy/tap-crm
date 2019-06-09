import { createAction } from 'redux-actions';
import { getUser } from 'api';

// Action type constants
export const FETCH_START = 'administration/user/FETCH_START';
export const FETCH_SUCCESS = 'administration/user/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/user/FETCH_FAIL';
export const RESET_STATE = 'administration/user/RESET_STATE';

// Action objects
export const userFetchStart = createAction(FETCH_START);
export const userFetchSuccess = createAction(FETCH_SUCCESS);
export const userFetchFail = createAction(FETCH_FAIL);
export const userResetState = createAction(RESET_STATE);

export function userFetch(id) {
  return dispatch => {
    dispatch(userFetchStart());

    getUser(id)
      .done(user => {
        dispatch(userFetchSuccess(user));
      })
      .fail(error => {
        dispatch(userFetchFail(error));
      });
  };
}
