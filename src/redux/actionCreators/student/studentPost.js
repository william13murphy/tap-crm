import { createAction } from 'redux-actions';
import { createStudent, updateStudent } from 'api';

// Action type constants
export const POST_START = 'student/studentPost/POST_START';
export const POST_SUCCESS = 'student/studentPost/POST_SUCCESS';
export const POST_FAIL = 'student/studentPost/POST_FAIL';
export const FORM_RESET = 'student/studentPost/FORM_RESET';

// Action objects
export const studentPostStart = createAction(POST_START);
export const studentPostSuccess = createAction(POST_SUCCESS);
export const studentPostFail = createAction(POST_FAIL);
export const studentFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentCreate(formData) {
  return dispatch => {
    dispatch(studentPostStart());

    createStudent(formData)
      .done(id => {
        dispatch(studentPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPostFail(error));
      });
  };
}

export function studentUpdate(formData) {
  return dispatch => {
    dispatch(studentPostStart());

    updateStudent(formData)
      .done(id => {
        dispatch(studentPostSuccess(id));
      })
      .fail(error => {
        dispatch(studentPostFail(error));
      });
  };
}
