import { createAction } from 'redux-actions';
import { saveClientNote } from 'api';

// Action type constants
export const POST_START = 'client/notePost/POST_START';
export const POST_SUCCESS = 'client/notePost/POST_SUCCESS';
export const POST_FAIL = 'client/notePost/POST_FAIL';
export const FORM_RESET = 'client/notePost/FORM_RESET';

// Action objects
export const clientNotePostStart = createAction(POST_START);
export const clientNotePostSuccess = createAction(POST_SUCCESS);
export const clientNotePostFail = createAction(POST_FAIL);
export const clientNoteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function clientNotePost(formData) {
  return dispatch => {
    dispatch(clientNotePostStart());

    saveClientNote(formData)
      .done(() => {
        dispatch(clientNotePostSuccess());
      })
      .fail(error => {
        dispatch(clientNotePostFail(error));
      });
  };
}
