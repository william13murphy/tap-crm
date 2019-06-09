import { createAction } from 'redux-actions';
import { deleteStudentContact } from 'api';

// Action type constants
export const POST_START = 'student/contactDelete/POST_START';
export const POST_SUCCESS = 'student/contactDelete/POST_SUCCESS';
export const POST_FAIL = 'student/contactDelete/POST_FAIL';
export const FORM_RESET = 'student/contactDelete/FORM_RESET';

// Action objects
export const studentContactDeleteStart = createAction(POST_START);
export const studentContactDeleteSuccess = createAction(POST_SUCCESS);
export const studentContactDeleteFail = createAction(POST_FAIL);
export const studentContactDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentContactDelete(formData) {
  return dispatch => {
    dispatch(studentContactDeleteStart());

    deleteStudentContact(formData)
      .done(payload => {
        dispatch(studentContactDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentContactDeleteFail(error));
      });
  };
}
