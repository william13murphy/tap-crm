import { createAction } from 'redux-actions';
import { getEFCFlaggedNotes } from 'api';

// Action type constants
export const FETCH_START = 'student/efcFlaggedNotes/FETCH_START';
export const FETCH_SUCCESS = 'student/efcFlaggedNotes/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/efcFlaggedNotes/FETCH_FAIL';
export const RESET_STATE = 'student/efcFlaggedNotes/RESET_STATE';

// Action objects
export const efcFlaggedNotesFetchStart = createAction(FETCH_START);
export const efcFlaggedNotesFetchSuccess = createAction(FETCH_SUCCESS);
export const efcFlaggedNotesFetchFail = createAction(FETCH_FAIL);
export const efcFlaggedNotesResetState = createAction(RESET_STATE);

export function efcFlaggedNotesFetch() {
  return dispatch => {
    dispatch(efcFlaggedNotesFetchStart());

    getEFCFlaggedNotes()
      .done(allStudents => {
        dispatch(efcFlaggedNotesFetchSuccess(allStudents));
      })
      .fail(error => {
        dispatch(efcFlaggedNotesFetchFail(error));
      });
  };
}
