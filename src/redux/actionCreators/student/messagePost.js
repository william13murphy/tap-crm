import { createAction } from 'redux-actions';
import { saveStudentMessage } from 'api';

// Action type constants
export const POST_START = 'student/messagePost/POST_START';
export const POST_SUCCESS = 'student/messagePost/POST_SUCCESS';
export const POST_FAIL = 'student/messagePost/POST_FAIL';
export const FORM_RESET = 'student/messagePost/FORM_RESET';

// Action objects
export const studentMessagePostStart = createAction(POST_START);
export const studentMessagePostSuccess = createAction(POST_SUCCESS);
export const studentMessagePostFail = createAction(POST_FAIL);
export const studentMessageFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentMessagePost(formData) {
  return dispatch => {
    dispatch(studentMessagePostStart());

    saveStudentMessage(formData)
      .done(() => {
        dispatch(studentMessagePostSuccess());
      })
      .fail(error => {
        dispatch(studentMessagePostFail(error));
      });
  };
}
