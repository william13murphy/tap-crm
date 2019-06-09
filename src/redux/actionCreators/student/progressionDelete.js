import { createAction } from 'redux-actions';
import { deleteStudentStyleRankProgression } from 'api';

// Action type constants
export const POST_START = 'student/progressionDelete/POST_START';
export const POST_SUCCESS = 'student/progressionDelete/POST_SUCCESS';
export const POST_FAIL = 'student/progressionDelete/POST_FAIL';
export const FORM_RESET = 'student/progressionDelete/FORM_RESET';

// Action objects
export const studentProgressionDeleteStart = createAction(POST_START);
export const studentProgressionDeleteSuccess = createAction(POST_SUCCESS);
export const studentProgressionDeleteFail = createAction(POST_FAIL);
export const studentProgressionDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentProgressionDelete(formData) {
  return dispatch => {
    dispatch(studentProgressionDeleteStart());

    deleteStudentStyleRankProgression(formData)
      .done(payload => {
        dispatch(studentProgressionDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(studentProgressionDeleteFail(error));
      });
  };
}
