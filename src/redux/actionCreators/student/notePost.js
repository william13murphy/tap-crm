import { createAction } from 'redux-actions';
import { saveStudentNote } from 'api';

// Action type constants
export const POST_START = 'student/notePost/POST_START';
export const POST_SUCCESS = 'student/notePost/POST_SUCCESS';
export const POST_FAIL = 'student/notePost/POST_FAIL';
export const FORM_RESET = 'student/notePost/FORM_RESET';

// Action objects
export const studentNotePostStart = createAction(POST_START);
export const studentNotePostSuccess = createAction(POST_SUCCESS);
export const studentNotePostFail = createAction(POST_FAIL);
export const studentNoteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentNotePost(formData) {
  return dispatch => {
    dispatch(studentNotePostStart());

    saveStudentNote(formData)
      .done(() => {
        dispatch(studentNotePostSuccess());
      })
      .fail(error => {
        dispatch(studentNotePostFail(error));
      });
  };
}
