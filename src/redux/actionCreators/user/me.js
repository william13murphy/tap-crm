import { createAction } from 'redux-actions';
import { getUserMe } from 'api';

// Action type constants
export const FETCH_START = 'user/me/FETCH_START';
export const FETCH_SUCCESS = 'user/me/FETCH_SUCCESS';
export const FETCH_FAIL = 'user/me/FETCH_FAIL';
export const RESET_STATE = 'user/me/RESET_STATE';

// Action objects
export const userMeFetchStart = createAction(FETCH_START);
export const userMeFetchSuccess = createAction(FETCH_SUCCESS);
export const userMeFetchFail = createAction(FETCH_FAIL);
export const userMeResetState = createAction(RESET_STATE);

export function userMeFetch(id) {
  return dispatch => {
    dispatch(userMeFetchStart());

    getUserMe()
      .done(user => {
        dispatch(userMeFetchSuccess(user));
      })
      .fail(error => {
        dispatch(userMeFetchFail(error));
      });
  };
}
