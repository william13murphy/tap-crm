import { createAction } from 'redux-actions';
import { saveSchoolNote } from 'api';

// Action type constants
export const POST_START = 'school/notePost/POST_START';
export const POST_SUCCESS = 'school/notePost/POST_SUCCESS';
export const POST_FAIL = 'school/notePost/POST_FAIL';
export const FORM_RESET = 'school/notePost/FORM_RESET';

// Action objects
export const schoolNotePostStart = createAction(POST_START);
export const schoolNotePostSuccess = createAction(POST_SUCCESS);
export const schoolNotePostFail = createAction(POST_FAIL);
export const schoolNoteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolNotePost(formData) {
  return dispatch => {
    dispatch(schoolNotePostStart());

    saveSchoolNote(formData)
      .done(() => {
        dispatch(schoolNotePostSuccess());
      })
      .fail(error => {
        dispatch(schoolNotePostFail(error));
      });
  };
}
