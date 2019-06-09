import { createAction } from 'redux-actions';
import { getStudentNotes } from 'api';

// Action type constants
export const FETCH_START = 'student/notes/FETCH_START';
export const FETCH_SUCCESS = 'student/notes/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/notes/FETCH_FAIL';
export const RESET_STATE = 'student/notes/RESET_STATE';

// Action objects
export const studentNotesFetchStart = createAction(FETCH_START);
export const studentNotesFetchSuccess = createAction(FETCH_SUCCESS);
export const studentNotesFetchFail = createAction(FETCH_FAIL);
export const studentNotesResetState = createAction(RESET_STATE);

export function studentNotesFetch(id: string) {
  return dispatch => {
    dispatch(studentNotesFetchStart());

    getStudentNotes((id: string))
      .done(studentNotes => {
        dispatch(studentNotesFetchSuccess(studentNotes));
      })
      .fail(error => {
        dispatch(studentNotesFetchFail(error));
      });
  };
}
