import { createAction } from 'redux-actions';
import { getProgressionException } from 'api';

// Action type constants
export const FETCH_START = 'report/progressionException/FETCH_START';
export const FETCH_SUCCESS = 'report/progressionException/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/progressionException/FETCH_FAIL';
export const RESET_STATE = 'report/progressionException/RESET_STATE';

// Action objects
export const progressionExceptionFetchStart = createAction(FETCH_START);
export const progressionExceptionFetchSuccess = createAction(FETCH_SUCCESS);
export const progressionExceptionFetchFail = createAction(FETCH_FAIL);
export const progressionExceptionResetState = createAction(RESET_STATE);

export function progressionExceptionFetch(id: string) {
  return dispatch => {
    dispatch(progressionExceptionFetchStart());

    getProgressionException((id: string))
      .done(payload => {
        dispatch(progressionExceptionFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(progressionExceptionFetchFail(error));
      });
  };
}
