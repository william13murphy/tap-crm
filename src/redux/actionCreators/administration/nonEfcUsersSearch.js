import { createAction } from 'redux-actions';
import { getAdministrationUsersNonEfc } from 'api';
import { nonEfcUsersUpdate } from 'src/redux/actionCreators/administration/nonEfcUsersUpdate';

// Action type constants
export const FETCH_START = 'administration/nonEfcUsersSearch/FETCH_START';
export const FETCH_SUCCESS = 'administration/nonEfcUsersSearch/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/nonEfcUsersSearch/FETCH_FAIL';
export const FORM_RESET = 'administration/nonEfcUsersSearch/FORM_RESET';

// Action objects
export const nonEfcUsersFetchStart = createAction(FETCH_START);
export const nonEfcUsersFetchSuccess = createAction(FETCH_SUCCESS);
export const nonEfcUsersFetchFail = createAction(FETCH_FAIL);
export const nonEfcUsersFetchResetState = createAction(FORM_RESET);

// Thunk action objects
export function nonEfcUsersSearch(params) {
  return dispatch => {
    dispatch(nonEfcUsersFetchStart());

    getAdministrationUsersNonEfc(params)
      .done(payload => {
        dispatch(nonEfcUsersFetchSuccess(payload));
        dispatch(nonEfcUsersUpdate(payload));
      })
      .fail(error => {
        dispatch(nonEfcUsersFetchFail(error));
      });
  };
}

export function nonEfcUsersReset() {
  return dispatch => {
    dispatch(nonEfcUsersFetchResetState());
  };
}
