import { createAction } from 'redux-actions';
import { deleteSchoolLetterTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateLetterDelete/POST_START';
export const POST_SUCCESS = 'school/templateLetterDelete/POST_SUCCESS';
export const POST_FAIL = 'school/templateLetterDelete/POST_FAIL';
export const FORM_RESET = 'school/templateLetterDelete/FORM_RESET';

// Action objects
export const templateLetterDeleteStart = createAction(POST_START);
export const templateLetterDeleteSuccess = createAction(POST_SUCCESS);
export const templateLetterDeleteFail = createAction(POST_FAIL);
export const templateLetterFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateLetterDelete(formData) {
  return dispatch => {
    dispatch(templateLetterDeleteStart());

    deleteSchoolLetterTemplate(formData)
      .done(payload => {
        dispatch(templateLetterDeleteSuccess(payload));
      })
      .fail(error => {
        dispatch(templateLetterDeleteFail(error));
      });
  };
}
