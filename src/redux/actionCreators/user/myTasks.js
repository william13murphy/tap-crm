import { createAction } from 'redux-actions';
import { getUserMyTasks } from 'api';

// Action type constants
export const FETCH_START = 'user/myTasks/FETCH_START';
export const FETCH_SUCCESS = 'user/myTasks/FETCH_SUCCESS';
export const FETCH_FAIL = 'user/myTasks/FETCH_FAIL';
export const RESET_STATE = 'user/myTasks/RESET_STATE';

// Action objects
export const myTasksFetchStart = createAction(FETCH_START);
export const myTasksFetchSuccess = createAction(FETCH_SUCCESS);
export const myTasksFetchFail = createAction(FETCH_FAIL);
export const myTasksResetState = createAction(RESET_STATE);

export function myTasksFetch(id) {
  return dispatch => {
    dispatch(myTasksFetchStart());

    getUserMyTasks(id)
      .done(user => {
        dispatch(myTasksFetchSuccess(user));
      })
      .fail(error => {
        dispatch(myTasksFetchFail(error));
      });
  };
}

export function myTasksReset() {
  return dispatch => {
    dispatch(myTasksResetState());
  };
}
