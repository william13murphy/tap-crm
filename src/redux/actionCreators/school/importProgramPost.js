import { createAction } from 'redux-actions';
import { postImportSchoolPrograms } from 'api';

// Action type constants
export const POST_START = 'school/importProgramPost/POST_START';
export const POST_SUCCESS = 'school/importProgramPost/POST_SUCCESS';
export const POST_FAIL = 'school/importProgramPost/POST_FAIL';
export const FORM_RESET = 'school/importProgramPost/FORM_RESET';

// Action objects
export const importProgramPostStart = createAction(POST_START);
export const importProgramPostSuccess = createAction(POST_SUCCESS);
export const importProgramPostFail = createAction(POST_FAIL);
export const importProgramFormReset = createAction(FORM_RESET);

// Thunk action objects
export function importProgramPost(formData) {
  return dispatch => {
    dispatch(importProgramPostStart());

    postImportSchoolPrograms(formData)
      .done(payload => {
        dispatch(importProgramPostSuccess(payload));
      })
      .fail(error => {
        dispatch(importProgramPostFail(error));
      });
  };
}
