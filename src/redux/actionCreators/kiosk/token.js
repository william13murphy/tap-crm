import { createAction } from 'redux-actions';
import { postKioskToken } from 'api';

// Action type constants
export const POST_START = 'kiosk/token/POST_START';
export const POST_SUCCESS = 'kiosk/token/POST_SUCCESS';
export const POST_FAIL = 'kiosk/token/POST_FAIL';
export const TOKEN_RESET = 'kiosk/token/TOKEN_RESET';
export const FROM_CACHE = 'kiosk/token/FROM_CACHE';

// Action objects
export const tokenPostStart = createAction(POST_START);
export const tokenPostSuccess = createAction(POST_SUCCESS);
export const tokenPostFail = createAction(POST_FAIL);

// Log out the user:
export const tokenReset = createAction(TOKEN_RESET);

export const tokenFromCache = createAction(FROM_CACHE);

import {
  getSessionStorageToken,
  setSessionStorageToken,
  resetSessionStorageToken,
  setTokenCache,
} from 'util/token';

// Fetch thunk
type tokenPostParameters = {
  userName: string,
  password: string,
};

export function tokenPost({ userName, password }: tokenPostParameters) {
  return dispatch => {
    dispatch(tokenPostStart());

    postKioskToken({ userName, password })
      .done(payload => {
        setTokenCache(payload);
        dispatch(tokenPostSuccess(payload));
      })
      .fail(error => {
        dispatch(tokenPostFail(error));
      });
    // }
  };
}
