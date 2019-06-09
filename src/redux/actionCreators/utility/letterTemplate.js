import { createAction } from 'redux-actions';
import { getLetterTemplate } from 'api';

// Action type constants
export const FETCH_START = 'utility/letterTemplate/FETCH_START';
export const FETCH_SUCCESS = 'utility/letterTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'utility/letterTemplate/FETCH_FAIL';
export const RESET_STATE = 'utility/letterTemplate/RESET_STATE';

// Action objects
export const letterTemplateFetchStart = createAction(FETCH_START);
export const letterTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const letterTemplateFetchFail = createAction(FETCH_FAIL);
export const letterTemplateResetState = createAction(RESET_STATE);

export function letterTemplateFetch(id) {
  return dispatch => {
    dispatch(letterTemplateFetchStart());

    getLetterTemplate(id)
      .done(payload => {
        dispatch(letterTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(letterTemplateFetchFail(error));
      });
  };
}

export function letterTemplateReset() {
  return dispatch => {
    dispatch(letterTemplateResetState());
  };
}
