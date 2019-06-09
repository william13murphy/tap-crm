import { createAction } from 'redux-actions';
import { saveSchoolStudentList } from 'api';

// Action type constants
export const POST_START = 'school/studentListPost/POST_START';
export const POST_SUCCESS = 'school/studentListPost/POST_SUCCESS';
export const POST_FAIL = 'school/studentListPost/POST_FAIL';
export const FORM_RESET = 'school/studentListPost/FORM_RESET';

// Action objects
export const studentListPostStart = createAction(POST_START);
export const studentListPostSuccess = createAction(POST_SUCCESS);
export const studentListPostFail = createAction(POST_FAIL);
export const studentListFormReset = createAction(FORM_RESET);

// Thunk action objects
export function studentListSave(formData) {
  return dispatch => {
    dispatch(studentListPostStart());

    saveSchoolStudentList(formData)
      .done(payload => {
        dispatch(studentListPostSuccess(payload));
      })
      .fail(error => {
        dispatch(studentListPostFail(error));
      });
  };
}
