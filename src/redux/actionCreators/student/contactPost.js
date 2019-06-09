import { createAction } from 'redux-actions';
import { createStudentContact, updateStudentContact } from 'api';

// Action type constants
export const POST_START = 'student/contactPost/POST_START';
export const POST_SUCCESS = 'student/contactPost/POST_SUCCESS';
export const POST_FAIL = 'student/contactPost/POST_FAIL';
export const FORM_RESET = 'student/contactPost/FORM_RESET';

// Action objects
export const contactPostStart = createAction(POST_START);
export const contactPostSuccess = createAction(POST_SUCCESS);
export const contactPostFail = createAction(POST_FAIL);
export const studentContactPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentContactCreate(formData) {
  return dispatch => {
    dispatch(contactPostStart());

    createStudentContact(formData)
      .done(id => {
        dispatch(contactPostSuccess(id));
      })
      .fail(error => {
        dispatch(contactPostFail(error));
      });
  };
}

export function studentContactUpdate(formData) {
  return dispatch => {
    dispatch(contactPostStart());

    updateStudentContact(formData)
      .done(id => {
        dispatch(contactPostSuccess(id));
      })
      .fail(error => {
        dispatch(contactPostFail(error));
      });
  };
}
