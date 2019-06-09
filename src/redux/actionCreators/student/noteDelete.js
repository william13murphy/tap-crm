import { createAction } from 'redux-actions';
import { deleteStudentNote } from 'api';

// Action type constants
export const POST_START = 'student/noteDelete/POST_START';
export const POST_SUCCESS = 'student/noteDelete/POST_SUCCESS';
export const POST_FAIL = 'student/noteDelete/POST_FAIL';
export const FORM_RESET = 'student/noteDelete/FORM_RESET';

// Action objects
export const studentNoteDeleteStart = createAction(POST_START);
export const studentNoteDeleteSuccess = createAction(POST_SUCCESS);
export const studentNoteDeleteFail = createAction(POST_FAIL);
export const studentNoteDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentNoteDelete(formData) {
  return dispatch => {
    dispatch(studentNoteDeleteStart());

    deleteStudentNote(formData)
      .done(payload => {
        dispatch(studentNoteDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentNoteDeleteFail(error));
      });
  };
}
