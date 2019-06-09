import { createAction } from 'redux-actions';
import { getEomReport } from 'api';

// Action type constants
export const FETCH_START = 'report/getEom/FETCH_START';
export const FETCH_SUCCESS = 'report/getEom/FETCH_SUCCESS';
export const FETCH_FAIL = 'report/getEom/FETCH_FAIL';
export const RESET_STATE = 'report/getEom/RESET_STATE';

// Action objects
export const eomFetchStart = createAction(FETCH_START);
export const eomFetchSuccess = createAction(FETCH_SUCCESS);
export const eomFetchFail = createAction(FETCH_FAIL);
export const eomResetState = createAction(RESET_STATE);

export function eomFetch(id: string) {
  return dispatch => {
    dispatch(eomFetchStart());

    getEomReport((id: string))
      .done(payload => {
        dispatch(eomFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(eomFetchFail(error));
      });
  };
}
