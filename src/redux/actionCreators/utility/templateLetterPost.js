import { createAction } from 'redux-actions';
import { createLetterTemplate, updateLetterTemplate } from 'api';

// Action type constants
export const POST_START = 'utility/templateLetterPost/POST_START';
export const POST_SUCCESS = 'utility/templateLetterPost/POST_SUCCESS';
export const POST_FAIL = 'utility/templateLetterPost/POST_FAIL';
export const FORM_RESET = 'utility/templateLetterPost/FORM_RESET';

// Action objects
export const templateLetterPostStart = createAction(POST_START);
export const templateLetterPostSuccess = createAction(POST_SUCCESS);
export const templateLetterPostFail = createAction(POST_FAIL);
export const templateLetterFormReset = createAction(FORM_RESET);

// Thunk action objects
export function templateLetterCreate(formData) {
  return dispatch => {
    dispatch(templateLetterPostStart());

    createLetterTemplate(formData)
      .done(() => {
        dispatch(templateLetterPostSuccess());
      })
      .fail(error => {
        dispatch(templateLetterPostFail(error));
      });
  };
}

export function templateLetterUpdate(formData) {
  return dispatch => {
    dispatch(templateLetterPostStart());

    updateLetterTemplate(formData)
      .done(() => {
        dispatch(templateLetterPostSuccess());
      })
      .fail(error => {
        dispatch(templateLetterPostFail(error));
      });
  };
}
