import { createAction } from 'redux-actions';
import { saveSchoolLetterTemplate } from 'api';

// Action type constants
export const POST_START = 'school/templateLetterPost/POST_START';
export const POST_SUCCESS = 'school/templateLetterPost/POST_SUCCESS';
export const POST_FAIL = 'school/templateLetterPost/POST_FAIL';
export const FORM_RESET = 'school/templateLetterPost/FORM_RESET';

// Action objects
export const templateLetterPostStart = createAction(POST_START);
export const templateLetterPostSuccess = createAction(POST_SUCCESS);
export const templateLetterPostFail = createAction(POST_FAIL);
export const templateLetterFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateLetterSave(formData) {
  return dispatch => {
    dispatch(templateLetterPostStart());

    saveSchoolLetterTemplate(formData)
      .done(payload => {
        dispatch(templateLetterPostSuccess(payload));
      })
      .fail(error => {
        dispatch(templateLetterPostFail(error));
      });
  };
}
