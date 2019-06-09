import { createAction } from 'redux-actions';
import { getStudentContacts } from 'api';

// Action type constants
export const FETCH_START = 'student/contacts/FETCH_START';
export const FETCH_SUCCESS = 'student/contacts/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/contacts/FETCH_FAIL';
export const RESET_STATE = 'student/contacts/RESET_STATE';

// Action objects
export const studentContactsFetchStart = createAction(FETCH_START);
export const studentContactsFetchSuccess = createAction(FETCH_SUCCESS);
export const studentContactsFetchFail = createAction(FETCH_FAIL);
export const studentContactsResetState = createAction(RESET_STATE);

export function studentContactsFetch(id: string) {
  return dispatch => {
    dispatch(studentContactsFetchStart());

    getStudentContacts((id: string))
      .done(studentContacts => {
        dispatch(studentContactsFetchSuccess(studentContacts));
      })
      .fail(error => {
        dispatch(studentContactsFetchFail(error));
      });
  };
}
