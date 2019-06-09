import { createAction } from 'redux-actions';
import { deleteStudent } from 'api';

// Action type constants
export const POST_START = 'student/studentDelete/POST_START';
export const POST_SUCCESS = 'student/studentDelete/POST_SUCCESS';
export const POST_FAIL = 'student/studentDelete/POST_FAIL';
export const FORM_RESET = 'student/studentDelete/FORM_RESET';

// Action objects
export const studentDeleteStart = createAction(POST_START);
export const studentDeleteSuccess = createAction(POST_SUCCESS);
export const studentDeleteFail = createAction(POST_FAIL);
export const studentDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentDelete(formData) {
  return dispatch => {
    dispatch(studentDeleteStart());

    deleteStudent(formData)
      .done(payload => {
        dispatch(studentDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentDeleteFail(error));
      });
  };
}
