import { createAction } from 'redux-actions';
import { convertSchoolLeadToStudent } from 'api';

// Action type constants
export const POST_START = 'school/convertLeadToStudent/POST_START';
export const POST_SUCCESS = 'school/convertLeadToStudent/POST_SUCCESS';
export const POST_FAIL = 'school/convertLeadToStudent/POST_FAIL';
export const FORM_RESET = 'school/convertLeadToStudent/FORM_RESET';

// Action objects
export const convertLeadToStudentStart = createAction(POST_START);
export const convertLeadToStudentSuccess = createAction(POST_SUCCESS);
export const convertLeadToStudentFail = createAction(POST_FAIL);
export const convertLeadToStudentReset = createAction(FORM_RESET);

// Thunk action objects
export function convertLeadToStudent(formData) {
  return dispatch => {
    dispatch(convertLeadToStudentStart());

    convertSchoolLeadToStudent(formData)
      .done(payload => {
        dispatch(convertLeadToStudentSuccess(payload));
      })
      .fail(error => {
        dispatch(convertLeadToStudentFail(error));
      });
  };
}
