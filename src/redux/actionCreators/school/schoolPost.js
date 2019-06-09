import { createAction } from 'redux-actions';
import { createSchool, updateSchool } from 'api';

// Action type constants
export const POST_START = 'school/schoolPost/POST_START';
export const POST_SUCCESS = 'school/schoolPost/POST_SUCCESS';
export const POST_FAIL = 'school/schoolPost/POST_FAIL';
export const FORM_RESET = 'school/schoolPost/FORM_RESET';

// Action objects
export const schoolPostStart = createAction(POST_START);
export const schoolPostSuccess = createAction(POST_SUCCESS);
export const schoolPostFail = createAction(POST_FAIL);
export const schoolFormReset = createAction(FORM_RESET);

// Thunk action objects
export function schoolCreate(formData) {
  return dispatch => {
    dispatch(schoolPostStart());

    createSchool(formData)
      .done(schoolId => {
        dispatch(
          schoolPostSuccess({
            schoolId,
          })
        );
      })
      .fail(error => {
        dispatch(schoolPostFail(error));
      });
  };
}

export function schoolUpdate(formData) {
  return dispatch => {
    dispatch(schoolPostStart());

    updateSchool(formData)
      .done(schoolId => {
        dispatch(
          schoolPostSuccess({
            schoolId,
          })
        );
      })
      .fail(error => {
        dispatch(schoolPostFail(error));
      });
  };
}
