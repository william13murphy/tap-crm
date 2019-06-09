import { createAction } from 'redux-actions';
import { saveStudentStyleRankProgression } from 'api';

// Action type constants
export const POST_START = 'student/progressionPost/POST_START';
export const POST_SUCCESS = 'student/progressionPost/POST_SUCCESS';
export const POST_FAIL = 'student/progressionPost/POST_FAIL';
export const FORM_RESET = 'student/progressionPost/FORM_RESET';

// Action objects
export const studentProgressionPostStart = createAction(POST_START);
export const studentProgressionPostSuccess = createAction(POST_SUCCESS);
export const studentProgressionPostFail = createAction(POST_FAIL);
export const studentProgressionPostFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentProgressionPost(formData) {
  return dispatch => {
    dispatch(studentProgressionPostStart());

    saveStudentStyleRankProgression(formData)
      .done(() => {
        dispatch(studentProgressionPostSuccess());
      })
      .fail(error => {
        dispatch(studentProgressionPostFail(error));
      });
  };
}
