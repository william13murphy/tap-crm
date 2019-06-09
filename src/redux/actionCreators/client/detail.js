import { createAction } from 'redux-actions';
import { getClientDetail } from 'api';

// Action type constants
export const FETCH_START = 'client/detail/FETCH_START';
export const FETCH_SUCCESS = 'client/detail/FETCH_SUCCESS';
export const FETCH_FAIL = 'client/detail/FETCH_FAIL';
export const RESET_STATE = 'client/detail/RESET_STATE';

// Action objects
export const clientDetailFetchStart = createAction(FETCH_START);
export const clientDetailFetchSuccess = createAction(FETCH_SUCCESS);
export const clientDetailFetchFail = createAction(FETCH_FAIL);
export const clientDetailResetState = createAction(RESET_STATE);

export function clientDetailFetch(id) {
  return dispatch => {
    dispatch(clientDetailFetchStart());

    getClientDetail(id)
      .done(clientDetail => {
        dispatch(clientDetailFetchSuccess(clientDetail));
      })
      .fail(error => {
        dispatch(clientDetailFetchFail(error));
      });
  };
}
