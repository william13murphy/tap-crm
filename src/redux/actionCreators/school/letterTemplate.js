import { createAction } from 'redux-actions';
import { getSchoolLetterTemplate } from 'api';

// Action type constants
export const FETCH_START = 'school/letterTemplate/FETCH_START';
export const FETCH_SUCCESS = 'school/letterTemplate/FETCH_SUCCESS';
export const FETCH_FAIL = 'school/letterTemplate/FETCH_FAIL';
export const RESET_STATE = 'school/letterTemplate/RESET_STATE';

// Action objects
export const letterTemplateFetchStart = createAction(FETCH_START);
export const letterTemplateFetchSuccess = createAction(FETCH_SUCCESS);
export const letterTemplateFetchFail = createAction(FETCH_FAIL);
export const letterTemplateResetState = createAction(RESET_STATE);

export function letterTemplateFetch(id) {
  return dispatch => {
    dispatch(letterTemplateFetchStart());

    getSchoolLetterTemplate(id)
      .done(payload => {
        dispatch(letterTemplateFetchSuccess(payload));
      })
      .fail(error => {
        dispatch(letterTemplateFetchFail(error));
      });
  };
}
