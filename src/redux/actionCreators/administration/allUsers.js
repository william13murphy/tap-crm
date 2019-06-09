import { createAction } from 'redux-actions';
import { getAllUsers } from 'api';

// Action type constants
export const FETCH_START = 'administration/allUsers/FETCH_START';
export const FETCH_SUCCESS = 'administration/allUsers/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/allUsers/FETCH_FAIL';
export const RESET_STATE = 'administration/allUsers/RESET_STATE';

// Action objects
export const allUsersFetchStart = createAction(FETCH_START);
export const allUsersFetchSuccess = createAction(FETCH_SUCCESS);
export const allUsersFetchFail = createAction(FETCH_FAIL);
export const allUsersResetState = createAction(RESET_STATE);

export function allUsersFetch() {
  return dispatch => {
    dispatch(allUsersFetchStart());

    getAllUsers()
      .done(allUsers => {
        dispatch(allUsersFetchSuccess(allUsers));
      })
      .fail(error => {
        dispatch(allUsersFetchFail(error));
      });
  };
}
