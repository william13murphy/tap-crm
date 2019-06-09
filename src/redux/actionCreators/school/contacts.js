import { createAction } from 'redux-actions';
import { getSchoolContacts } from 'api';

// Action type constants
export const FETCH_START = 'school/contacts/FETCH_START';
export const FETCH_SUCCESS = 'school/contacts/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/contacts/FETCH_FAIL';
export const RESET_STATE = 'school/contacts/RESET_STATE';

// Action objects
export const schoolContactsFetchStart = createAction(FETCH_START);
export const schoolContactsFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolContactsFetchFail = createAction(FETCH_FAIL);
export const schoolContactsResetState = createAction(RESET_STATE);

export function schoolContactsFetch(id: string) {
  return dispatch => {
    dispatch(schoolContactsFetchStart());

    getSchoolContacts((id: string))
      .done(schoolContacts => {
        dispatch(schoolContactsFetchSuccess(schoolContacts));
      })
      .fail(error => {
        dispatch(schoolContactsFetchFail(error));
      });
  };
}
