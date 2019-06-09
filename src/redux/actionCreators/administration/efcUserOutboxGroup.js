import { createAction } from 'redux-actions';
import { getEfcUserOutboxGroup } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserOutboxGroup/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserOutboxGroup/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserOutboxGroup/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserOutboxGroup/RESET_STATE';

// Action objects
export const efcUserOutboxGroupFetchStart = createAction(FETCH_START);
export const efcUserOutboxGroupFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserOutboxGroupFetchFail = createAction(FETCH_FAIL);
export const efcUserOutboxGroupResetState = createAction(RESET_STATE);

export function efcUserOutboxGroupFetch(id) {
  return dispatch => {
    dispatch(efcUserOutboxGroupFetchStart());

    getEfcUserOutboxGroup(id)
      .done(efcUsers => {
        dispatch(efcUserOutboxGroupFetchSuccess(efcUsers));
      })
      .fail(error => {
        dispatch(efcUserOutboxGroupFetchFail(error));
      });
  };
}
