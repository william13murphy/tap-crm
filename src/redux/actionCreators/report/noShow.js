import { createAction } from 'redux-actions';
import { getNoShow } from 'api';

// Action type constants
export const FETCH_START = 'report/noShow/FETCH_START';
export const FETCH_SUCCESS = 'report/noShow/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/noShow/FETCH_FAIL';
export const RESET_STATE = 'report/noShow/RESET_STATE';

// Action objects
export const noShowFetchStart = createAction(FETCH_START);
export const noShowFetchSuccess = createAction(FETCH_SUCCESS);
export const noShowFetchFail = createAction(FETCH_FAIL);
export const noShowResetState = createAction(RESET_STATE);

export function noShowFetch(id: string) {
  return dispatch => {
    dispatch(noShowFetchStart());

    getNoShow((id: string))
      .done(payload => {
        dispatch(noShowFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(noShowFetchFail(error));
      });
  };
}
