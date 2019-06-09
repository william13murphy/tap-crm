import { createAction } from 'redux-actions';
import { deleteStudentMessage } from 'api';

// Action type constants
export const POST_START = 'student/messageDelete/POST_START';
export const POST_SUCCESS = 'student/messageDelete/POST_SUCCESS';
export const POST_FAIL = 'student/messageDelete/POST_FAIL';
export const FORM_RESET = 'student/messageDelete/FORM_RESET';

// Action objects
export const studentMessageDeleteStart = createAction(POST_START);
export const studentMessageDeleteSuccess = createAction(POST_SUCCESS);
export const studentMessageDeleteFail = createAction(POST_FAIL);
export const studentMessageDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentMessageDelete(formData) {
  return dispatch => {
    dispatch(studentMessageDeleteStart());

    deleteStudentMessage(formData)
      .done(payload => {
        dispatch(studentMessageDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentMessageDeleteFail(error));
      });
  };
}
