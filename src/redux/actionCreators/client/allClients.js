import { createAction } from 'redux-actions';
import { getClients } from 'api';

// Action type constants
export const FETCH_START = 'client/allClients/FETCH_START';
export const FETCH_SUCCESS = 'client/allClients/FETCH_SUCCESS';
export const FETCH_FAIL = 'client/allClients/FETCH_FAIL';
export const RESET_STATE = 'client/allClients/RESET_STATE';

// Action objects
export const allClientsFetchStart = createAction(FETCH_START);
export const allClientsFetchSuccess = createAction(FETCH_SUCCESS);
export const allClientsFetchFail = createAction(FETCH_FAIL);
export const allClientsResetState = createAction(RESET_STATE);

export function allClientsFetch() {
  return dispatch => {
    dispatch(allClientsFetchStart());

    getClients()
      .done(payload => {
        dispatch(allClientsFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(allClientsFetchFail(error));
      });
  };
}
