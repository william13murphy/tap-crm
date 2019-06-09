import { createAction } from 'redux-actions';
import { getEfcUserOutbox } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserOutbox/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserOutbox/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserOutbox/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserOutbox/RESET_STATE';

// Action objects
export const efcUserOutboxFetchStart = createAction(FETCH_START);
export const efcUserOutboxFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserOutboxFetchFail = createAction(FETCH_FAIL);
export const efcUserOutboxResetState = createAction(RESET_STATE);

export function efcUserOutboxFetch(id) {
  return dispatch => {
    dispatch(efcUserOutboxFetchStart());

    getEfcUserOutbox(id)
      .done(efcUsers => {
        dispatch(efcUserOutboxFetchSuccess(efcUsers));
      })
      .fail(error => {
        dispatch(efcUserOutboxFetchFail(error));
      });
  };
}
