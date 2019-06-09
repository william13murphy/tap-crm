import { createAction } from 'redux-actions';
import { getEfcUserSchools } from 'api';

// Action type constants
export const FETCH_START = 'administration/efcUserSchools/FETCH_START';
export const FETCH_SUCCESS = 'administration/efcUserSchools/FETCH_SUCCESS';
export const FETCH_FAIL = 'administration/efcUserSchools/FETCH_FAIL';
export const RESET_STATE = 'administration/efcUserSchools/RESET_STATE';

// Action objects
export const efcUserSchoolsFetchStart = createAction(FETCH_START);
export const efcUserSchoolsFetchSuccess = createAction(FETCH_SUCCESS);
export const efcUserSchoolsFetchFail = createAction(FETCH_FAIL);
export const efcUserSchoolsResetState = createAction(RESET_STATE);

export function efcUserSchoolsFetch(id) {
  return dispatch => {
    dispatch(efcUserSchoolsFetchStart());

    getEfcUserSchools(id)
      .done(efcUsers => {
        dispatch(efcUserSchoolsFetchSuccess(efcUsers));
      })
      .fail(error => {
        dispatch(efcUserSchoolsFetchFail(error));
      });
  };
}
