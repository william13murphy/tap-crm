import { createAction } from 'redux-actions';
import { deleteSchoolStaff } from 'api';

// Action type constants
export const POST_START = 'school/staffDelete/POST_START';
export const POST_SUCCESS = 'school/staffDelete/POST_SUCCESS';
export const POST_FAIL = 'school/staffDelete/POST_FAIL';
export const FORM_RESET = 'school/staffDelete/FORM_RESET';

// Action objects
export const staffDeleteStart = createAction(POST_START);
export const staffDeleteSuccess = createAction(POST_SUCCESS);
export const staffDeleteFail = createAction(POST_FAIL);
export const staffDeleteFormReset = createAction(FORM_RESET);

// Thunk action objects
export function staffDelete(formData) {
  return dispatch => {
    dispatch(staffDeleteStart());

    deleteSchoolStaff(formData)
      .done(payload => {
        dispatch(staffDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(staffDeleteFail(error));
      });
  };
}
