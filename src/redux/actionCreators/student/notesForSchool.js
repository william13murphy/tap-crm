import { createAction } from 'redux-actions';
import { getNotesForSchool } from 'api';

// Action type constants
export const FETCH_START = 'student/notesForSchool/FETCH_START';
export const FETCH_SUCCESS = 'student/notesForSchool/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/notesForSchool/FETCH_FAIL';
export const RESET_STATE = 'student/notesForSchool/RESET_STATE';

// Action objects
export const notesForSchoolFetchStart = createAction(FETCH_START);
export const notesForSchoolFetchSuccess = createAction(FETCH_SUCCESS);
export const notesForSchoolFetchFail = createAction(FETCH_FAIL);
export const notesForSchoolResetState = createAction(RESET_STATE);

export function notesForSchoolFetch(id: string) {
  return dispatch => {
    dispatch(notesForSchoolFetchStart());

    getNotesForSchool((id: string))
      .done(payload => {
        dispatch(notesForSchoolFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(notesForSchoolFetchFail(error));
      });
  };
}
