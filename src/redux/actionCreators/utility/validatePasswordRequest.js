import { createAction } from 'redux-actions';
import { getValidatePasswordRequest } from 'api';

// Action type constants
export const FETCH_START = 'utility/validatePasswordRequest/FETCH_START';
export const FETCH_SUCCESS = 'utility/validatePasswordRequest/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/validatePasswordRequest/FETCH_FAIL';
export const RESET_STATE = 'utility/validatePasswordRequest/RESET_STATE';

// Action objects
export const validatePasswordRequestFetchStart = createAction(FETCH_START);
export const validatePasswordRequestFetchSuccess = createAction(FETCH_SUCCESS);
export const validatePasswordRequestFetchFail = createAction(FETCH_FAIL);
export const validatePasswordRequestResetState = createAction(RESET_STATE);

export function validatePasswordRequestFetch(id) {
  return dispatch => {
    dispatch(validatePasswordRequestFetchStart());

    getValidatePasswordRequest(id)
      .done(payload => {
        dispatch(validatePasswordRequestFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(validatePasswordRequestFetchFail(error));
      });
  };
}
