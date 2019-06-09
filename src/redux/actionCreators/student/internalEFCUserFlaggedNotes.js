import { createAction } from 'redux-actions';
import { getInternalEFCUserFlaggedNotes } from 'api';

// Action type constants
export const FETCH_START = 'student/internalEFCUserFlaggedNotes/FETCH_START';
export const FETCH_SUCCESS =
  'student/internalEFCUserFlaggedNotes/FETCH_SUCCESS';
export const FETCH_FAIL = 'student/internalEFCUserFlaggedNotes/FETCH_FAIL';
export const RESET_STATE = 'student/internalEFCUserFlaggedNotes/RESET_STATE';

// Action objects
export const internalEFCUserFlaggedNotesFetchStart = createAction(FETCH_START);
export const internalEFCUserFlaggedNotesFetchSuccess = createAction(
  FETCH_SUCCESS
);
export const internalEFCUserFlaggedNotesFetchFail = createAction(FETCH_FAIL);
export const internalEFCUserFlaggedNotesResetState = createAction(RESET_STATE);

export function internalEFCUserFlaggedNotesFetch(id: string) {
  return dispatch => {
    dispatch(internalEFCUserFlaggedNotesFetchStart());

    getInternalEFCUserFlaggedNotes((id: string))
      .done(payload => {
        dispatch(internalEFCUserFlaggedNotesFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(internalEFCUserFlaggedNotesFetchFail(error));
      });
  };
}
