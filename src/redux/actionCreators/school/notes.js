import { createAction } from 'redux-actions';
import { getSchoolNotes } from 'api';

// Action type constants
export const FETCH_START = 'school/notes/FETCH_START';
export const FETCH_SUCCESS = 'school/notes/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/notes/FETCH_FAIL';
export const RESET_STATE = 'school/notes/RESET_STATE';

// Action objects
export const schoolNotesFetchStart = createAction(FETCH_START);
export const schoolNotesFetchSuccess = createAction(FETCH_SUCCESS);
export const schoolNotesFetchFail = createAction(FETCH_FAIL);
export const schoolNotesResetState = createAction(RESET_STATE);

export function schoolNotesFetch(id: string) {
  return dispatch => {
    dispatch(schoolNotesFetchStart());

    getSchoolNotes((id: string))
      .done(schoolNotes => {
        dispatch(schoolNotesFetchSuccess(schoolNotes));
      })
      .fail(error => {
        dispatch(schoolNotesFetchFail(error));
      });
  };
}
